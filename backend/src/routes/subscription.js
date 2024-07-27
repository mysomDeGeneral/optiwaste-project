//subscription.js
const express = require('express');
const router = express.Router();
const Collector = require('../models/collector');

router.post('/', async (req, res) => {
    const { subscription, collectorId } = req.body;
    
    console.log('id', collectorId);
    console.log('sub', subscription);

    try {
        const parsedSubscription = JSON.parse(subscription);
        const collector = await Collector.findByIdAndUpdate(
            collectorId,
            {
                $set: {
                    pushSubscription: {
                        endpoint: parsedSubscription.endpoint,
                        keys: {
                            p256dh: parsedSubscription.keys.p256dh,
                            auth: parsedSubscription.keys.auth
                        }
                    }
                }
            },
            { new: true, runValidators: true }
        );

        if (!collector) {
            return res.status(404).json({ error: 'Collector not found' });
        }

        console.log('Updated collector:', collector);
        res.status(200).json({ message: 'Subscription added successfully!', collector });
    } catch (error) {
        console.error('Error saving subscription:', error);
        res.status(500).json({ error: 'Failed to save subscription' });
    }
});
module.exports = router;
