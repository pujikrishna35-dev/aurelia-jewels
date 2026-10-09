const { prisma, getActiveTenantId } = require('../config/prisma');

const getMetals = async (req, res, next) => {
  try {
    const tenantId = await getActiveTenantId();
    const metals = await prisma.metal.findMany({
      where: { tenantId }
    });

    res.json({
      success: true,
      data: metals
    });
  } catch (error) {
    next(error);
  }
};

const getMetalPrices = async (req, res, next) => {
  try {
    const tenantId = await getActiveTenantId();
    const metalPrices = await prisma.metalPrice.findMany({
      where: { tenantId },
      include: {
        Metal: true
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      success: true,
      data: metalPrices
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMetals,
  getMetalPrices
};
