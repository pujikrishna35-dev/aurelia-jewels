const { prisma, getActiveTenantId } = require('../config/prisma');

const getInvoiceById = async (req, res, next) => {
  try {
    const tenantId = await getActiveTenantId();
    const id = parseInt(req.params.id);

    let invoice;
    if (isNaN(id)) {
      // If the parameter is not a number, treat it as an invoiceNumber string
      const invoiceNumber = req.params.id;
      invoice = await prisma.invoice.findFirst({
        where: { invoiceNumber, tenantId },
        include: {
          Order: {
            include: {
              OrderItem: true,
              Customer: true
            }
          }
        }
      });
    } else {
      invoice = await prisma.invoice.findFirst({
        where: { id, tenantId },
        include: {
          Order: {
            include: {
              OrderItem: true,
              Customer: true
            }
          }
        }
      });
    }

    if (!invoice) {
      return res.status(404).json({ success: false, message: 'Invoice not found' });
    }

    res.json({
      success: true,
      data: invoice
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getInvoiceById
};
