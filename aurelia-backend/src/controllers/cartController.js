const { prisma, getActiveTenantId } = require('../config/prisma');
const pricingService = require('../services/pricingService');

// Get cart for a customer
const getCart = async (req, res, next) => {
  try {
    const tenantId = await getActiveTenantId();
    const customerId = parseInt(req.params.customerId);

    if (isNaN(customerId)) {
      return res.status(400).json({ success: false, message: 'Invalid customer ID' });
    }

    // Find or create cart
    let cart = await prisma.cart.findFirst({
      where: { customerId, tenantId },
      include: {
        CartItem: {
          include: {
            Product: {
              include: {
                ProductImage: { orderBy: { displayOrder: 'asc' } }
              }
            }
          }
        }
      }
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          tenantId,
          customerId,
          cartCode: `CART-${customerId}-${Date.now().toString().slice(-4)}`,
          updatedAt: new Date()
        },
        include: {
          CartItem: {
            include: {
              Product: true
            }
          }
        }
      });
    }

    // Recalculate each cart item pricing based on current db metal price and discounts
    const activeDiscounts = await pricingService.getActiveDiscounts(tenantId);
    let cartSubtotal = 0;
    let cartDiscount = 0;
    let cartGst = 0;
    let cartTotal = 0;

    const items = [];
    for (const item of cart.CartItem) {
      const pricing = await pricingService.calculateProductPricing(item.Product, tenantId, activeDiscounts);
      const qty = item.quantity;
      
      const itemSubtotal = pricing.basePrice * qty;
      const itemDiscount = pricing.discountAmount * qty;
      const itemGst = pricing.gstAmount * qty;
      const itemTotal = pricing.totalAmount * qty;

      cartSubtotal += itemSubtotal;
      cartDiscount += itemDiscount;
      cartGst += itemGst;
      cartTotal += itemTotal;

      items.push({
        id: item.id,
        productId: item.productId,
        productName: item.Product.name,
        productImage: item.Product.imageUrl || (item.Product.ProductImage?.[0]?.imageUrl || ''),
        quantity: qty,
        unitPrice: pricing.basePrice,
        makingCharge: pricing.makingCharges,
        stoneAmount: pricing.totalStones,
        gstAmount: pricing.gstAmount,
        discountAmount: pricing.discountAmount,
        totalPrice: pricing.totalAmount,
        grossWeight: item.Product.grossWeight,
        netWeight: item.Product.netWeight,
        gstPercentage: item.Product.gstPercentage,
        metalType: item.Product.metalType
      });
    }

    res.json({
      success: true,
      data: {
        id: cart.id,
        customerId: cart.customerId,
        cartCode: cart.cartCode,
        subtotal: cartSubtotal,
        discountAmount: cartDiscount,
        gstAmount: cartGst,
        grandTotal: cartTotal,
        items
      }
    });
  } catch (error) {
    next(error);
  }
};

// Add item to cart
const addToCart = async (req, res, next) => {
  try {
    const tenantId = await getActiveTenantId();
    const { customerId, productId, quantity } = req.body;
    const qty = parseInt(quantity || 1);

    if (!customerId || !productId) {
      return res.status(400).json({ success: false, message: 'customerId and productId are required' });
    }

    // Check product existence
    const product = await prisma.product.findUnique({
      where: { id: productId, tenantId },
      include: { ProductMetal: true }
    });

    if (!product || !product.isActive) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Get or create cart
    let cart = await prisma.cart.findFirst({
      where: { customerId, tenantId }
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          tenantId,
          customerId,
          cartCode: `CART-${customerId}-${Date.now().toString().slice(-4)}`,
          updatedAt: new Date()
        }
      });
    }

    // Check if item already exists in cart
    const existingItem = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId
        }
      }
    });

    // Calculate current pricing
    const pricing = await pricingService.calculateProductPricing(product, tenantId);

    if (existingItem) {
      // Update quantity
      const newQty = existingItem.quantity + qty;
      const updatedItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: {
          quantity: newQty,
          unitPrice: pricing.basePrice,
          makingCharge: pricing.makingCharges,
          stoneAmount: pricing.totalStones,
          gstAmount: pricing.gstAmount,
          discountAmount: pricing.discountAmount,
          totalPrice: pricing.totalAmount,
          updatedAt: new Date()
        }
      });
      return res.json({ success: true, data: updatedItem });
    } else {
      // Create new cart item
      const newItem = await prisma.cartItem.create({
        data: {
          tenantId,
          cartId: cart.id,
          productId,
          productName: product.name,
          productImage: product.imageUrl,
          sku: product.sku,
          quantity: qty,
          unitPrice: pricing.basePrice,
          makingCharge: pricing.makingCharges,
          stoneAmount: pricing.totalStones,
          gstAmount: pricing.gstAmount,
          discountAmount: pricing.discountAmount,
          totalPrice: pricing.totalAmount,
          grossWeight: product.grossWeight,
          netWeight: product.netWeight,
          gstPercentage: product.gstPercentage || 3,
          metalType: product.metalType,
          updatedAt: new Date()
        }
      });
      return res.status(201).json({ success: true, data: newItem });
    }
  } catch (error) {
    next(error);
  }
};

// Update cart item quantity
const updateCartItem = async (req, res, next) => {
  try {
    const tenantId = await getActiveTenantId();
    const id = parseInt(req.params.id);
    const { quantity } = req.body;

    if (isNaN(id) || quantity === undefined) {
      return res.status(400).json({ success: false, message: 'Invalid arguments' });
    }

    const qty = parseInt(quantity);
    if (qty <= 0) {
      // If quantity is 0 or less, delete the item
      await prisma.cartItem.delete({
        where: { id, tenantId }
      });
      return res.json({ success: true, message: 'Item removed from cart' });
    }

    const item = await prisma.cartItem.findUnique({
      where: { id, tenantId },
      include: { Product: { include: { ProductMetal: true } } }
    });

    if (!item) {
      return res.status(404).json({ success: false, message: 'Cart item not found' });
    }

    // Recalculate pricing in case metal rates or discounts changed
    const pricing = await pricingService.calculateProductPricing(item.Product, tenantId);

    const updatedItem = await prisma.cartItem.update({
      where: { id, tenantId },
      data: {
        quantity: qty,
        unitPrice: pricing.basePrice,
        makingCharge: pricing.makingCharges,
        stoneAmount: pricing.totalStones,
        gstAmount: pricing.gstAmount,
        discountAmount: pricing.discountAmount,
        totalPrice: pricing.totalAmount,
        updatedAt: new Date()
      }
    });

    res.json({
      success: true,
      data: updatedItem
    });
  } catch (error) {
    next(error);
  }
};

// Delete cart item
const deleteCartItem = async (req, res, next) => {
  try {
    const tenantId = await getActiveTenantId();
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ success: false, message: 'Invalid cart item ID' });
    }

    await prisma.cartItem.delete({
      where: { id, tenantId }
    });

    res.json({
      success: true,
      message: 'Item deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  deleteCartItem
};
