const { prisma, getActiveTenantId } = require('../config/prisma');
const pricingService = require('../services/pricingService');

const getProducts = async (req, res, next) => {
  try {
    const tenantId = await getActiveTenantId();
    const { category, collection, metal, stone, isNew, isBestSeller } = req.query;

    const where = {
      tenantId,
      isActive: true,
    };

    if (category) {
      where.Category = { slug: category };
    }
    if (collection) {
      where.Collection = { slug: collection };
    }
    if (isNew) {
      where.isNew = isNew === 'true';
    }
    if (isBestSeller) {
      where.isBestSeller = isBestSeller === 'true';
    }
    if (metal) {
      where.ProductMetal = {
        some: {
          metalType: { equals: metal, mode: 'insensitive' }
        }
      };
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        ProductMetal: true,
        ProductImage: {
          orderBy: { displayOrder: 'asc' }
        },
        Category: true,
        Collection: true
      }
    });

    const productsWithPricing = await pricingService.attachDiscountsToProducts(tenantId, products);

    res.json({
      success: true,
      data: productsWithPricing
    });
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const tenantId = await getActiveTenantId();
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ success: false, message: 'Invalid product ID' });
    }

    const product = await prisma.product.findUnique({
      where: { id, tenantId },
      include: {
        ProductMetal: true,
        ProductImage: {
          orderBy: { displayOrder: 'asc' }
        },
        Category: true,
        Collection: true,
        Review: {
          where: { isApproved: true },
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!product || !product.isActive) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const [productWithPricing] = await pricingService.attachDiscountsToProducts(tenantId, [product]);

    res.json({
      success: true,
      data: productWithPricing
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProductById
};
