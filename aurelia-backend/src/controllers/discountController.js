const { prisma, getActiveTenantId } = require('../config/prisma');

const getDiscounts = async (req, res, next) => {
  try {
    const tenantId = await getActiveTenantId();
    const discounts = await prisma.discount.findMany({
      where: { tenantId },
      include: {
        Category: true,
        Collection: true,
        Product_Discount_productIdToProduct: true
      }
    });

    res.json({
      success: true,
      data: discounts
    });
  } catch (error) {
    next(error);
  }
};

const getActiveDiscounts = async (req, res, next) => {
  try {
    const tenantId = await getActiveTenantId();
    const now = new Date();
    const discounts = await prisma.discount.findMany({
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

    res.json({
      success: true,
      data: discounts
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDiscounts,
  getActiveDiscounts
};
