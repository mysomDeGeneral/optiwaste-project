const express = require('express');
const router = express.Router();
require('dotenv').config();
const axios = require('axios');
const crypto = require('crypto');
const PayStack = require('../apis/paystackConfig');
const Paystack = require('paystack-api');
const { assignCollectorToRequest } = require('../services/assignment');
const { updatePaymentStatus } = require('../controllers/requests');



router.post('/initialize-payment', async (req, res) => {
    try {
        const { amount, email, reference , callbackUrl} = req.body;
    
        const response = await axios.post(
          'https://api.paystack.co/transaction/initialize',
          {
            amount: amount * 100, 
            email,
            reference,
            callback_url: callbackUrl,
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
              'Content-Type': 'application/json',
            },
          }
        );
        console.log('payment-response',response.data);
        res.json(response.data);
      } catch (error) {
        console.error('Error initializing payment:', error);
        res.status(500).json({ error: 'Failed to initialize payment' });
      }  
});

router.post('/paystack-webhook', async (req, res) => {
    try {
    const hash = crypto.createHmac('sha512', process.env.PAYSTACK_SECRET_KEY)
      .update(JSON.stringify(req.body))
      .digest('hex');
  
    if (hash === req.headers['x-paystack-signature']) {
      const event = req.body;
  
      if (event.event === 'charge.success') {
        const { reference } = event.data;
        
        // Verify the transaction
        const verifyResponse = await axios.get(
          `https://api.paystack.co/transaction/verify/${reference}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
            },
          }
        );
  
        if (verifyResponse.data.status) {
          // Payment successful, update your database
          await updatePaymentStatus(reference, 'paid');
          
          // Assign the request to a collector
          await assignCollectorToRequest(reference);
        }
      }
  
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
    } catch (error) {
    console.error('Error processing Paystack webhook:', error);
    res.sendStatus(500);
    }
  });

module.exports = router;