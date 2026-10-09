const Razorpay = require('razorpay');

const razorpayKeyId = process.env.RAZORPAY_KEY_ID || 'rzp_test_TRwwZsAG2Trlxn';
const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET || 'your_razorpay_secret_key';

let razorpay = null;

try {
  if (razorpayKeyId && razorpayKeySecret) {
    razorpay = new Razorpay({
      key_id: razorpayKeyId,
      key_secret: razorpayKeySecret
    });
  }
} catch (error) {
  console.error('Failed to initialize Razorpay SDK:', error.message);
}

module.exports = {
  razorpay,
  razorpayKeyId,
  razorpayKeySecret
};
