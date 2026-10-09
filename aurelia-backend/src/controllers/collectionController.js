const { prisma, getActiveTenantId } = require('../config/prisma');

const getCollections = async (req, res, next) => {
  try {
    const tenantId = await getActiveTenantId();
    const collections = await prisma.collection.findMany({
      where: {
        tenantId,
        isActive: true
      },
      orderBy: { displayOrder: 'asc' }
    });

    res.json({
      success: true,
      data: collections
    });
  } catch (error) {
    next(error);
  }
};

const getCollectionById = async (req, res, next) => {
  try {
    const tenantId = await getActiveTenantId();
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      // Allow searching by slug as well
      const slug = req.params.id;
      const collection = await prisma.collection.findFirst({
        where: { slug, tenantId, isActive: true }
      });
      if (!collection) {
        return res.status(404).json({ success: false, message: 'Collection not found' });
      }
      return res.json({ success: true, data: collection });
    }

    const collection = await prisma.collection.findFirst({
      where: { id, tenantId, isActive: true }
    });

    if (!collection) {
      return res.status(404).json({ success: false, message: 'Collection not found' });
    }

    res.json({
      success: true,
      data: collection
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCollections,
  getCollectionById
};
