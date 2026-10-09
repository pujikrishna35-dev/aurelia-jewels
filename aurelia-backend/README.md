# Aurelia Jewellery Backend

This is the secure backend server for Aurelia Jewellery, built with Node.js, Express, and Prisma ORM, interfacing with the existing `shanti_backend` database.

## Architecture
```
Aurelia Jewellery Website (Vanilla JS/HTML)
           ↓
Node.js / Express Backend (Port 5000)
           ↓
       Prisma ORM
           ↓
PostgreSQL Database (shanti_backend)
```

## Security Design
- No database credentials or `DATABASE_URL` are exposed to the frontend.
- Standard CORS security is implemented to only allow registered origins.
- Sensitive HTTP headers are secured using Helmet.
- API rate limiting is enforced on sensitive and general route endpoints.
- DB schema is introspected safely and client generated without running destructive database actions.

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- Existing running PostgreSQL instance containing `shanti_backend`

### Setup Instructions
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create your `.env` configuration file:
   ```bash
   cp .env.example .env
   ```
3. Update `.env` with your PostgreSQL credentials:
   ```env
   DATABASE_URL="postgresql://postgres:PASSWORD@localhost:5432/shanti_backend?schema=public"
   PORT=5000
   ALLOWED_ORIGIN="http://localhost:8080"
   ```
4. Introspect database schema and generate Prisma client:
   ```bash
   npm run prisma:pull
   npm run prisma:generate
   ```

### Running Server
- Run in Development Mode (with hot reloading):
  ```bash
  npm run dev
  ```
- Run in Production Mode:
  ```bash
  npm start
  ```

## REST API Documentation

### System Health
- **GET** `/api/health` - Check API and Database connection health.

### Core Resources
- **GET** `/api/products` - List products with live prices/discounts.
- **GET** `/api/products/:id` - Fetch product by ID with reviews.
- **GET** `/api/categories` - Fetch categories.
- **GET** `/api/categories/:id` - Fetch single category.
- **GET** `/api/collections` - Fetch collections.
- **GET** `/api/collections/:id` - Fetch collection by ID/slug.
- **GET** `/api/metals` - List metals.
- **GET** `/api/metal-prices` - Fetch latest metal rates.
- **GET** `/api/discounts` - List store discounts.
- **GET** `/api/discounts/active` - List currently active discounts.

### Customer Management
- **POST** `/api/customers` - Register a customer.
- **GET** `/api/customers/:id` - Retrieve profile.
- **PUT** `/api/customers/:id` - Update profile.

### Shopping Cart
- **GET** `/api/cart/:customerId` - Fetch customer's cart.
- **POST** `/api/cart` - Add or increment item in cart.
- **PUT** `/api/cart/:id` - Update cart item quantity.
- **DELETE** `/api/cart/:id` - Remove item from cart.

### Order Processing & Invoicing
- **POST** `/api/orders` - Place a new order (clears cart, computes prices, starts transaction).
- **GET** `/api/orders/:id` - Get order details.
- **GET** `/api/customers/:customerId/orders` - Get customer's orders history.
- **GET** `/api/invoices/:id` - Look up invoice by ID or invoice number.
