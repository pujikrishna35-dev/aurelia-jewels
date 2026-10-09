const express = require('express');
const router = express.Router();
const { prisma } = require('../config/prisma');

// Import Controllers
const productController = require('../controllers/productController');
const categoryController = require('../controllers/categoryController');
const collectionController = require('../controllers/collectionController');
const metalController = require('../controllers/metalController');
const discountController = require('../controllers/discountController');
const customerController = require('../controllers/customerController');
const cartController = require('../controllers/cartController');
const orderController = require('../controllers/orderController');
const invoiceController = require('../controllers/invoiceController');

// Health Check Routes
router.get('/health', async (req, res) => {
  try {
    // Check DB availability
    await prisma.$queryRaw`SELECT 1`;
    res.json({
      success: true,
      message: 'Aurelia Jewellery API is running and connected to PostgreSQL'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Aurelia Jewellery API is running, but database connection failed',
      error: error.message
    });
  }
});

// Product Routes
router.get('/products', productController.getProducts);
router.get('/products/:id', productController.getProductById);

// Category Routes
router.get('/categories', categoryController.getCategories);
router.get('/categories/:id', categoryController.getCategoryById);

// Collection Routes
router.get('/collections', collectionController.getCollections);
router.get('/collections/:id', collectionController.getCollectionById);

// Metal Routes
router.get('/metals', metalController.getMetals);
router.get('/metal-prices', metalController.getMetalPrices);

// Discount Routes
router.get('/discounts', discountController.getDiscounts);
router.get('/discounts/active', discountController.getActiveDiscounts);

// Customer Routes
router.post('/customers', customerController.createCustomer);
router.post('/customers/login', customerController.loginCustomer);
router.get('/customers/:id', customerController.getCustomerById);
router.put('/customers/:id', customerController.updateCustomer);
router.get('/customers/:customerId/orders', orderController.getCustomerOrders); // Support nested orders path

// Cart Routes
router.get('/cart/:customerId', cartController.getCart);
router.post('/cart', cartController.addToCart);
router.put('/cart/:id', cartController.updateCartItem);
router.delete('/cart/:id', cartController.deleteCartItem);

// Order Routes
router.post('/orders', orderController.createOrder);
router.get('/orders/:id', orderController.getOrderById);
router.post('/orders/:id/refund', orderController.refundOrder);

// Payment Routes
router.post('/payments/verify', orderController.verifyPayment);

// Invoice Routes
router.get('/invoices/:id', invoiceController.getInvoiceById);

module.exports = router;
