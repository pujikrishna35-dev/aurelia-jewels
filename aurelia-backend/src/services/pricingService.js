const { prisma } = require('../config/prisma');

class PricingService {
  async getActiveDiscounts(tenantId) {
    const now = new Date();
    return prisma.discount.findMany({
      where: {
        tenantId,
        isActive: true,
        startDate: { lte: now },
        endDate: { gte: now }
      },
      include: {
        Category: true,
        Collection: true,
        Product_Discount_productIdToProduct: true
      }
    });
  }

  getApplicableDiscount(product, activeDiscounts) {
    // Find product-specific discount
    const productDiscount = activeDiscounts.find(
      d => d.scope === 'PRODUCT' && d.productId === product.id && product.id !== null
    );
    if (productDiscount) return productDiscount;

    // Find category discount
    const categoryDiscount = activeDiscounts.find(
      d => d.scope === 'CATEGORY' && d.categoryId === product.categoryId
    );
    if (categoryDiscount) return categoryDiscount;

    // Find collection discount
    const collectionDiscount = activeDiscounts.find(
      d => d.scope === 'COLLECTION' && d.collectionId === product.collectionId
    );
    if (collectionDiscount) return collectionDiscount;

    // Find store-wide discount
    const storeDiscount = activeDiscounts.find(d => d.scope === 'STORE');
    if (storeDiscount) return storeDiscount;

    return null;
  }

  async calculateBaseAmount(product, tenantId) {
    let goldValue = 0;
    const netWeight = Number(product.netWeight || 0);
    // makingCharge is passed as a per-gram rate
    let makingCharges = netWeight * Number(product.makingCharge || 0);
    let totalStones = Number(product.stoneAmount || 0);
    let metalRate = 0;

    if (product.ProductMetal && product.ProductMetal.length > 0) {
      const pm = product.ProductMetal[0];
      const metalType = pm.metalType || '';
      const purity = pm.purity || '';

      let rateDoc = null;
      if (metalType) {
        const searchNames = [];
        if (purity) {
          searchNames.push(`${metalType} ${purity}`);
          searchNames.push(`${metalType}${purity}`);
        }
        searchNames.push(metalType);

        for (const name of searchNames) {
          rateDoc = await prisma.metalPrice.findFirst({
            where: {
              tenantId,
              Metal: { name: { equals: name, mode: 'insensitive' } }
            },
            orderBy: { createdAt: 'desc' }
          });
          if (rateDoc) break;
        }
      }

      // Fallback: search for metal name inside description if not found
      if (!rateDoc) {
        const metals = await prisma.metal.findMany({
          where: { tenantId },
          include: {
            MetalPrice: {
              orderBy: { createdAt: 'desc' },
              take: 1
            }
          }
        });

        const pricedMetals = metals.filter(m => m.MetalPrice && m.MetalPrice.length > 0);

        if (pricedMetals.length > 0) {
          const descText = ((product.description || '') + ' ' + (product.longDescription || '')).toLowerCase();
          let bestMatch = null;
          let bestMatchLength = 0;

          for (const metal of pricedMetals) {
            const metalNameLower = metal.name.toLowerCase();
            if (descText.includes(metalNameLower)) {
              if (metal.name.length > bestMatchLength) {
                bestMatch = metal;
                bestMatchLength = metal.name.length;
              }
            }
          }

          if (bestMatch) {
            rateDoc = bestMatch.MetalPrice[0];
          }
        }
      }

      if (rateDoc) {
        metalRate = Number(rateDoc.price);
      }
    }

    // 1. Valid Product.basePrice (Only use if explicitly told to trust it e.g., existing products without components)
    // However, if we have netWeight and metalRate, we strictly calculate from components to prevent missing stones
    if (Number(product.basePrice || 0) > 0 && !(metalRate > 0 && netWeight > 0)) {
      return { itemBaseSubtotal: Math.max(0, Number(product.basePrice) - totalStones), makingCharges, totalStones, metalRate };
    }

    // 2. Canonical pricing components
    if (metalRate > 0 && netWeight > 0) {
      // Respect manual originalPrice override from UI, else calculate auto
      goldValue = Number(product.originalPrice || 0) > 0
        ? Number(product.originalPrice)
        : (netWeight * metalRate);

      const itemBaseSubtotal = goldValue + makingCharges;
      return { itemBaseSubtotal, makingCharges, totalStones, metalRate };
    }

    // 3. Safe fallback to amountWithoutGst only when verified as undiscounted (if basePrice is 0 and no components)
    return { itemBaseSubtotal: Number(product.amountWithoutGst || 0), makingCharges, totalStones, metalRate };
  }

  async calculateProductPricing(product, tenantId, activeDiscounts) {
    let productGstPercent = Number(product.gstPercentage || 3);
    let totalStones = Number(product.stoneAmount || 0);
    let metalRate = 0;

    if (product.pricingMode === 'MANUAL_FINAL') {
      let manualPrice = Number(product.manualPrice || 0);
      let includesGst = product.manualPriceIncludesGst;
      if (typeof includesGst === 'string') includesGst = includesGst === 'true';

      let amountWithoutGst = 0;
      let gstAmount = 0;
      let totalAmount = 0;

      if (includesGst) {
        totalAmount = manualPrice;
        amountWithoutGst = manualPrice / (1 + (productGstPercent / 100));
        gstAmount = totalAmount - amountWithoutGst;
      } else {
        amountWithoutGst = manualPrice;
        gstAmount = amountWithoutGst * (productGstPercent / 100);
        totalAmount = amountWithoutGst + gstAmount;
      }

      return {
        basePrice: 0,
        isDiscountAdded: false,
        discountAmount: 0,
        discountName: null,
        discountPercentage: 0,
        amountWithoutGst,
        gstAmount,
        totalAmount,
        applicableDiscount: null,
        makingCharges: 0,
        totalStones: 0
      };
    }

    let itemBaseSubtotal = 0;
    let makingCharges = 0;

    if (product.pricingMode === 'MANUAL_BASE') {
      itemBaseSubtotal = Number(product.manualPrice || 0);
      totalStones = 0; // Do not add stone values for MANUAL_BASE
    } else {
      const baseCalc = await this.calculateBaseAmount(product, tenantId);
      itemBaseSubtotal = baseCalc.itemBaseSubtotal + baseCalc.totalStones;
      makingCharges = baseCalc.makingCharges;
      totalStones = baseCalc.totalStones;
      metalRate = baseCalc.metalRate || 0;
    }

    let applicableDiscount = null;
    if (activeDiscounts) {
      applicableDiscount = this.getApplicableDiscount(product, activeDiscounts);
    } else {
      const discounts = await this.getActiveDiscounts(tenantId);
      applicableDiscount = this.getApplicableDiscount(product, discounts);
    }

    let isDiscountAdded = false;
    let discountAmount = 0;
    let discountName = null;
    let discountPercentage = 0;
    let discountedSubtotal = itemBaseSubtotal;

    if (applicableDiscount && itemBaseSubtotal > 0) {
      if (applicableDiscount.scope === 'PRODUCT' && !applicableDiscount.productId) {
        // Ignore invalid product discount
      } else {
        isDiscountAdded = true;
        discountName = applicableDiscount.name;

        if (applicableDiscount.type === 'PERCENTAGE') {
          const goldVal = Number(applicableDiscount.goldValue || 0);
          const makingVal = Number(applicableDiscount.makingValue || 0);
          const stonesVal = Number(applicableDiscount.stonesValue) || goldVal || Number(applicableDiscount.value) || 0;
          applicableDiscount.stonesValue = stonesVal;

          if (goldVal > 0 || makingVal > 0 || stonesVal > 0) {
            const netWeight = Number(product.netWeight || 0);
            const wastagePercent = Number(product.wastage || 0);

            // Calculate pure gold value separately: netGoldValue = netWeight * metalRate
            let netGoldValue = 0;
            if (metalRate > 0 && netWeight > 0) {
              netGoldValue = netWeight * metalRate;
            } else {
              // Fallback if metalRate is not available
              const goldComponent = product.pricingMode === 'MANUAL_BASE'
                ? itemBaseSubtotal
                : Math.max(0, itemBaseSubtotal - makingCharges - totalStones);
              netGoldValue = goldComponent / (1 + (wastagePercent / 100));
            }

            const goldDiscount = netGoldValue * (goldVal / 100);
            const makingDiscount = makingCharges * (makingVal / 100);
            const stonesDiscount = totalStones * (stonesVal / 100);

            discountAmount = goldDiscount + makingDiscount + stonesDiscount;
            discountPercentage = (discountAmount / itemBaseSubtotal) * 100;
          } else {
            discountPercentage = Number(applicableDiscount.value);
            discountAmount = itemBaseSubtotal * (discountPercentage / 100);
          }
        } else if (applicableDiscount.type === 'FIXED') {
          discountAmount = Number(applicableDiscount.value);
          discountPercentage = (discountAmount / itemBaseSubtotal) * 100;
        }

        if (discountAmount > itemBaseSubtotal) discountAmount = itemBaseSubtotal;
        if (applicableDiscount.maximumDiscountAmount && discountAmount > Number(applicableDiscount.maximumDiscountAmount)) {
          discountAmount = Number(applicableDiscount.maximumDiscountAmount);
          discountPercentage = (discountAmount / itemBaseSubtotal) * 100;
        }
        discountedSubtotal = itemBaseSubtotal - discountAmount;
      }
    }

    let amountWithoutGst = discountedSubtotal;
    let gstAmount = amountWithoutGst * (productGstPercent / 100);
    let totalAmount = amountWithoutGst + gstAmount;

    return {
      basePrice: itemBaseSubtotal,
      isDiscountAdded,
      discountAmount,
      discountName,
      discountPercentage,
      amountWithoutGst,
      gstAmount,
      totalAmount,
      applicableDiscount,
      makingCharges,
      totalStones,
      metalRate
    };
  }

  async attachDiscountsToProducts(tenantId, products) {
    const activeDiscounts = await this.getActiveDiscounts(tenantId);

    const productsWithPricing = [];
    for (const product of products) {
      const pricing = await this.calculateProductPricing(product, tenantId, activeDiscounts);
      
      let displayPercentage = 0;
      if (pricing.applicableDiscount) {
        const ad = pricing.applicableDiscount;
        if (ad.type === 'PERCENTAGE') {
          const goldVal = Number(ad.goldValue || 0);
          const makingVal = Number(ad.makingValue || 0);
          const stonesVal = Number(ad.stonesValue || 0);
          if (goldVal > 0 || makingVal > 0 || stonesVal > 0) {
            displayPercentage = goldVal > 0 ? goldVal : (makingVal > 0 ? makingVal : stonesVal);
          } else {
            displayPercentage = Number(ad.value || 0);
          }
        } else {
          displayPercentage = Number(ad.value || 0);
        }
      }

      const appliedDiscount = pricing.applicableDiscount
        ? {
            id: pricing.applicableDiscount.id,
            name: pricing.applicableDiscount.name,
            percentage: displayPercentage,
            discountAmount: pricing.discountAmount,
            taxableAmount: pricing.amountWithoutGst,
            gstAmount: pricing.gstAmount,
            finalPrice: pricing.totalAmount
          }
        : null;

      productsWithPricing.push({
        ...product,
        basePrice: pricing.basePrice,
        discountAmount: pricing.discountAmount,
        amountWithoutGst: pricing.amountWithoutGst,
        gstAmount: pricing.gstAmount,
        totalAmount: pricing.totalAmount,
        appliedDiscount
      });
    }
    return productsWithPricing;
  }

  async calculateOrderTotals(tenantId, items, frontendShippingAmount = 0) {
    const activeDiscounts = await this.getActiveDiscounts(tenantId);

    let orderSubtotal = 0;
    let orderDiscountAmount = 0;
    let orderGstAmount = 0;
    let orderMakingCharges = 0;
    let orderStonesAmount = 0;

    const processedItems = [];

    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId, tenantId },
        include: { ProductMetal: true }
      });

      if (!product) throw new Error(`Product ID ${item.productId} not found`);

      const pricing = await this.calculateProductPricing(product, tenantId, activeDiscounts);
      let itemQuantity = Number(item.quantity || 1);
      let totalItemBaseSubtotal = pricing.basePrice * itemQuantity;

      let itemDiscountAmount = pricing.discountAmount * itemQuantity;
      let itemTaxableAmount = pricing.amountWithoutGst * itemQuantity;
      let itemGstAmount = pricing.gstAmount * itemQuantity;
      let itemGrandTotal = pricing.totalAmount * itemQuantity;

      orderSubtotal += totalItemBaseSubtotal;
      orderDiscountAmount += itemDiscountAmount;
      orderGstAmount += itemGstAmount;
      orderMakingCharges += (pricing.makingCharges * itemQuantity);
      orderStonesAmount += (pricing.totalStones * itemQuantity);

      processedItems.push({
        productId: product.id,
        productName: product.name,
        imageUrl: product.imageUrl || '',
        quantity: itemQuantity,
        unitPrice: pricing.basePrice,
        makingCharge: pricing.makingCharges,
        stoneAmount: pricing.totalStones,
        grossWeight: product.grossWeight,
        netWeight: product.netWeight,
        gstAmount: itemGstAmount,
        discountAmount: itemDiscountAmount,
        appliedDiscountId: pricing.applicableDiscount ? pricing.applicableDiscount.id : null,
        totalPrice: itemGrandTotal,
        taxableAmount: itemTaxableAmount
      });
    }

    let finalShippingAmount = Number(frontendShippingAmount || 0);
    let orderGrandTotal = (orderSubtotal - orderDiscountAmount) + orderGstAmount + finalShippingAmount;

    return {
      subtotal: orderSubtotal,
      makingCharges: orderMakingCharges,
      stoneAmount: orderStonesAmount,
      discountAmount: orderDiscountAmount,
      gstAmount: orderGstAmount,
      shippingAmount: finalShippingAmount,
      grandTotal: orderGrandTotal,
      items: processedItems
    };
  }
}

module.exports = new PricingService();
