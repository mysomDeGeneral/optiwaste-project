require('dotenv').config();
const PayStack = require('paystack-api')(process.env.PAYSTACK_SECRET_KEY);

exports = PayStack;