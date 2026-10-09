const API_URL = 'http://localhost:5000/api';

const apiService = {
  async getProducts(params = {}) {
    try {
      const url = new URL(`${API_URL}/products`);
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
      const res = await fetch(url);
      const json = await res.json();
      return json.success ? json.data : [];
    } catch (error) {
      console.error('API Error: getProducts failed', error);
      return [];
    }
  },

  async getProductById(id) {
    try {
      const res = await fetch(`${API_URL}/products/${id}`);
      const json = await res.json();
      return json.success ? json.data : null;
    } catch (error) {
      console.error(`API Error: getProductById(${id}) failed`, error);
      return null;
    }
  },

  async getCategories() {
    try {
      const res = await fetch(`${API_URL}/categories`);
      const json = await res.json();
      return json.success ? json.data : [];
    } catch (error) {
      console.error('API Error: getCategories failed', error);
      return [];
    }
  },

  async getCollections() {
    try {
      const res = await fetch(`${API_URL}/collections`);
      const json = await res.json();
      return json.success ? json.data : [];
    } catch (error) {
      console.error('API Error: getCollections failed', error);
      return [];
    }
  },

  async getMetalPrices() {
    try {
      const res = await fetch(`${API_URL}/metal-prices`);
      const json = await res.json();
      return json.success ? json.data : [];
    } catch (error) {
      console.error('API Error: getMetalPrices failed', error);
      return [];
    }
  },

  async getDiscounts() {
    try {
      const res = await fetch(`${API_URL}/discounts/active`);
      const json = await res.json();
      return json.success ? json.data : [];
    } catch (error) {
      console.error('API Error: getDiscounts failed', error);
      return [];
    }
  },

  async registerCustomer(data) {
    try {
      const res = await fetch(`${API_URL}/customers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return await res.json();
    } catch (error) {
      console.error('API Error: registerCustomer failed', error);
      return { success: false, message: 'Connection to server failed' };
    }
  },

  async loginCustomer(email, password) {
    try {
      const res = await fetch(`${API_URL}/customers/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      return await res.json();
    } catch (error) {
      console.error('API Error: loginCustomer failed', error);
      return { success: false, message: 'Connection to server failed' };
    }
  },

  async getCustomerById(id) {
    try {
      const res = await fetch(`${API_URL}/customers/${id}`);
      return await res.json();
    } catch (error) {
      console.error(`API Error: getCustomerById(${id}) failed`, error);
      return { success: false, message: 'Connection to server failed' };
    }
  },

  async getCart(customerId) {
    try {
      const res = await fetch(`${API_URL}/cart/${customerId}`);
      const json = await res.json();
      return json.success ? json.data : null;
    } catch (error) {
      console.error(`API Error: getCart(${customerId}) failed`, error);
      return null;
    }
  },

  async addToCart(customerId, productId, quantity) {
    try {
      const res = await fetch(`${API_URL}/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId, productId, quantity })
      });
      return await res.json();
    } catch (error) {
      console.error('API Error: addToCart failed', error);
      return { success: false, message: 'Connection to server failed' };
    }
  },

  async updateCartItem(id, quantity) {
    try {
      const res = await fetch(`${API_URL}/cart/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity })
      });
      return await res.json();
    } catch (error) {
      console.error(`API Error: updateCartItem(${id}) failed`, error);
      return { success: false, message: 'Connection to server failed' };
    }
  },

  async deleteCartItem(id) {
    try {
      const res = await fetch(`${API_URL}/cart/${id}`, {
        method: 'DELETE'
      });
      return await res.json();
    } catch (error) {
      console.error(`API Error: deleteCartItem(${id}) failed`, error);
      return { success: false, message: 'Connection to server failed' };
    }
  },

  async placeOrder(orderData) {
    try {
      const res = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      return await res.json();
    } catch (error) {
      console.error('API Error: placeOrder failed', error);
      return { success: false, message: 'Connection to server failed' };
    }
  },

  async getCustomerOrders(customerId) {
    try {
      const res = await fetch(`${API_URL}/customers/${customerId}/orders`);
      const json = await res.json();
      return json.success ? json.data : [];
    } catch (error) {
      console.error(`API Error: getCustomerOrders(${customerId}) failed`, error);
      return [];
    }
  },

  async updateCustomer(id, data) {
    try {
      const res = await fetch(`${API_URL}/customers/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return await res.json();
    } catch (error) {
      console.error(`API Error: updateCustomer(${id}) failed`, error);
      return { success: false, message: 'Connection to server failed' };
    }
  },

  async verifyPayment(paymentDetails) {
    try {
      const res = await fetch(`${API_URL}/payments/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentDetails)
      });
      return await res.json();
    } catch (error) {
      console.error('API Error: verifyPayment failed', error);
      return { success: false, message: 'Connection to server failed' };
    }
  },

  async refundOrder(orderId, reason) {
    try {
      const res = await fetch(`${API_URL}/orders/${orderId}/refund`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason })
      });
      return await res.json();
    } catch (error) {
      console.error(`API Error: refundOrder(${orderId}) failed`, error);
      return { success: false, message: 'Connection to server failed' };
    }
  }
};
