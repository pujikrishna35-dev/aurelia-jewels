const crypto = require('crypto');
const { prisma, getActiveTenantId } = require('../config/prisma');

const hashPassword = (password) => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

const createCustomer = async (req, res, next) => {
  try {
    const tenantId = await getActiveTenantId();
    const { fullName, email, password, phone } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'fullName, email, and password are required'
      });
    }

    // Check if customer already exists for this tenant
    const existingCustomer = await prisma.customer.findFirst({
      where: {
        email,
        tenantId
      }
    });

    if (existingCustomer) {
      return res.status(400).json({
        success: false,
        message: 'Customer with this email already exists'
      });
    }

    const passwordHash = hashPassword(password);
    const customerCode = `CUST-${Date.now().toString().slice(-6)}`;

    const customer = await prisma.customer.create({
      data: {
        tenantId,
        fullName,
        email,
        phone,
        passwordHash,
        customerCode,
        updatedAt: new Date()
      }
    });

    // Don't return password hash
    const { passwordHash: _, ...customerData } = customer;

    res.status(201).json({
      success: true,
      data: customerData
    });
  } catch (error) {
    next(error);
  }
};

const getCustomerById = async (req, res, next) => {
  try {
    const tenantId = await getActiveTenantId();
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ success: false, message: 'Invalid customer ID' });
    }

    const customer = await prisma.customer.findUnique({
      where: { id, tenantId }
    });

    if (!customer) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }

    const { passwordHash: _, ...customerData } = customer;

    res.json({
      success: true,
      data: customerData
    });
  } catch (error) {
    next(error);
  }
};

const updateCustomer = async (req, res, next) => {
  try {
    const tenantId = await getActiveTenantId();
    const id = parseInt(req.params.id);
    const { fullName, phone, password, dob, anniversary } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({ success: false, message: 'Invalid customer ID' });
    }

    const existingCustomer = await prisma.customer.findUnique({
      where: { id, tenantId }
    });

    if (!existingCustomer) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }

    const updateData = {
      updatedAt: new Date()
    };

    if (fullName !== undefined) updateData.fullName = fullName;
    if (phone !== undefined) updateData.phone = phone;
    if (dob !== undefined) updateData.dob = dob ? new Date(dob) : null;
    if (anniversary !== undefined) updateData.anniversary = anniversary ? new Date(anniversary) : null;
    if (password) updateData.passwordHash = hashPassword(password);

    const updatedCustomer = await prisma.customer.update({
      where: { id, tenantId },
      data: updateData
    });

    const { passwordHash: _, ...customerData } = updatedCustomer;

    res.json({
      success: true,
      data: customerData
    });
  } catch (error) {
    next(error);
  }
};

const loginCustomer = async (req, res, next) => {
  try {
    const tenantId = await getActiveTenantId();
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const customer = await prisma.customer.findFirst({
      where: { email, tenantId }
    });

    if (!customer || customer.passwordHash !== hashPassword(password)) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const { passwordHash: _, ...customerData } = customer;

    res.json({
      success: true,
      data: customerData
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCustomer,
  getCustomerById,
  updateCustomer,
  loginCustomer
};
