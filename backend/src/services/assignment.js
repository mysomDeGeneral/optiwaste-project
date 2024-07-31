const webPush = require('web-push');
const Request = require('../models/request');
const Collector = require('../models/collector');
require('dotenv').config();

webPush.setVapidDetails(
    'mailto:fianyekukokonumichael@gmail.com',
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
);

async function assignCollectorToRequest(requestId, rejectedCollectorId = null) {
    try {
        const request = await Request.findById(requestId);
        if (!request) {
            console.log('Request not found');
            throw new Error('Request not found');
        }

        const query = {
            available: true,
            wasteTypes: { $in: [request.wasteType] },
        };

        if (rejectedCollectorId) {
            query._id = { $ne: rejectedCollectorId };
        }

        const suitableCollectors = await Collector.find(query);

        if (suitableCollectors.length === 0) {
            request.collector = null;
            request.requestStatus = 'Unassigned';
        } else {
            request.collector = suitableCollectors[0]._id;
            request.requestStatus = 'Assigned';

            const assignedCollector = await Collector.findById(request.collector);

            if (assignedCollector && assignedCollector.pushSubscription) {
                console.log('Sending push notification');
                const payload = JSON.stringify({
                    title: 'New Waste Collection Request',
                    message: `You have been assigned a new request at ${request.address}`,
                    requestId: request._id.toString(),
                });

                try {
                    await webPush.sendNotification(JSON.parse(assignedCollector.pushSubscription), payload);
                    console.log('Push notification sent successfully');
                } catch (error) {
                    console.error('Error sending push notification:', error);
                }
            }
        }

        await request.save();
        return request;
    } catch (error) {
        console.error('Error in assignCollectorToRequest:', error);
        throw error;
    }
}

module.exports = { assignCollectorToRequest };