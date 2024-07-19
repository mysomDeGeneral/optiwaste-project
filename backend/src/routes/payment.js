const express = require('express');
const router = express.Router();
const PayStack = require('../apis/paystackConfig');
const Paystack = require('paystack-api');



router.post('/initialize', async (req, res) => {
    try {
        const { amount, email, callbackUrl } = req.body;

        const response = await PayStack.transaction.initialize({
            amount: amount * 100,
            email,
            callbackUrl
        });

        res.json(response.data);
    } catch (error) {
        console.error("Payment initialization error:", error);
        res.status(500).json({error: "Payment initialization failed"});
    }
});

router.get('/verify/:reference', async (req, res) => {
    try {
        const { reference } = req.params;

        const response = await Paystack.transaction.verify(reference);

        if (response.data.status === 'success') {
            // update request status
            res.json({ status: 'success', data: response.data });
        } else {
            res.json({status: 'failed', message: 'Payment verification failed'});
        }
    } catch (error) {
        console.error("Payment verification error:", error);
        res.status(500).json({error: "Payment verificafication failed"});
    }
});

module.exports = router;