const { prisma, getActiveTenantId } = require('../config/prisma');

const getCategories = async (req, res, next) => {
  try {
    const tenantId = await getActiveTenantId();
    const categories = await prisma.category.findMany({
      where: {
        tenantId,
        isActive: true
      },
      orderBy: { displayOrder: 'asc' }
    });

    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    next(error);
  }
};

const getCategoryById = async (req, res, next) => {
  try {
    const tenantId = await getActiveTenantId();
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ success: false, message: 'Invalid category ID' });
    }

    const category = await prisma.category.findFirst({
      where: { id, tenantId, isActive: true }
    });

    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    res.json({
      success: true,
      data: category
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCategories,
  getCategoryById
};
