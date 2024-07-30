//assignment.js
// const webPush = require('web-push');
const admin = require('firebase-admin');
const Collector = require('../models/collector');
const Request = require('../models/request');
require('dotenv').config();

// webPush.setVapidDetails(
//     'mailto:fianyekukokonumichael@gmail.com',
//     process.env.VAPID_PUBLIC_KEY,
//     process.env.VAPID_PRIVATE_KEY
// );

// Initialize Firebase Admin SDK
const serviceAccount = require('../serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


async function assignCollectorToRequest(requestId, rejectedCollectorId = null) {
    try {
        const request = await Request.findById(requestId);
        if (!request) {
            console.log('Request not found');
            throw new Error('Request not found');
        }

        const query = {
            available: true,
            wasteTypes: { $in: [request.wasteType]},
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
        

        // const payload = JSON.stringify({
        //     title: 'New Waste Collection Request',
        //     message: `You have been assigned a new request at ${request.address}`,
        //     requestId: requestId,
        // });

        // if (assignedCollector && assignedCollector.pushSubscription) {
        //     console.log('Sending push notification');
        //     try{
        //         await webPush.sendNotification(assignedCollector.pushSubscription, payload);
        //         console.log('Push notification sent successfully');
        //     } catch (error) {
        //         console.error('Error sending push notification:', error);
        //     }
            
        // }

        if (assignedCollector && assignedCollector.fmcToken) {
            console.log('Sending push notification');
            const message = {
              notification: {
                title: 'New Waste Collection Request',
                body: `You have been assigned a new request at ${request.address}`,
              },
              data: {
                requestId: requestId.toString(),
              },
              token: assignedCollector.fmcToken,
            };
    
            try {
              const response = await admin.messaging().send(message);
              console.log('Successfully sent message:', response);
            } catch (error) {
              console.error('Error sending message:', error);
            }
          }
    }

        await request.save();

        return request;
    } catch (error) {
        throw error;
    }
}

module.exports = { assignCollectorToRequest };