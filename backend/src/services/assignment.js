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
// const serviceAccount = {
//     type: "service_account",
//     project_id: process.env.FIREBASE_PROJECT_ID,
//     private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
//     private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
//     client_email: process.env.FIREBASE_CLIENT_EMAIL,
//     client_id: process.env.FIREBASE_CLIENT_ID,
//     auth_uri: "https://accounts.google.com/o/oauth2/auth",
//     token_uri: "https://oauth2.googleapis.com/token",
//     auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
//     client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${process.env.FIREBASE_CLIENT_EMAIL.replace('@', '%40')}`
//   };

  var serviceAccount = {
  "type": "service_account",
  "project_id": "optiwaste-19300",
  "private_key_id": "1e4b4eb7009b0c36beee1ed2d293c7aad5e36922",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDJPygsA7lChG6M\nwOGkWmgFEl2a6spC/KXvbLi76GkVfUMeUZ9ifBvzxZ1Jqp1zwvLpDxTR0nWuZJkG\nDfsZp4ra7nINYt5eYYBdm9RTMvOZ/hKPrYha/5qh2cu+Fx0dM9sbGJSs/AsMNdLX\nYwmPAIyMqUXqe1brudZ2z5aTJGrDa5G6mBCFIVJHiaATwKBua1V4pUFSooBRDbpA\nidLtMCppFmbnQEdVuBBHDZldjgaXSzpm8FI1Dzz8rYXj0ZYiZfM2/hzI9pCyEKHB\nSveyM8x6V0rWhVBgtTe/XYwDm5j+8Utl83isW73R8JnKdB6oKveK7v74fGvuN/2O\nj8dd6rxzAgMBAAECggEAU2tonYYVnysCIDo7zkLjZ2bLglHc8ZOEvRBWKx4VoSDB\nV6oB5XMIqy25GzYr+jZPNqhXuvoAaf+tJsNY2LOIbWP1xvK6tmi4KxVTGAHA1I5q\n5z/Ji970HC8Js4wlN1utcTfpOSNo+PC+qyWUasCRgiUQpDfoOeJYsfsusWOhFcud\n8tY7jO/+VdpwfaVw4oIXDPzzy9MFi3ASeLd8+f2j9nAwxoMwBy4roQ4ib2jkr2YO\ng4eJPPI/v5yhD2aEPbf8Lca/HvCMVX1UJ1bTbSs3LCDtAfwx49y9tQOC54X3fHWs\nQrLNBmMqZqK9EiFHYpcZNHkxhdyiS6owBvlUN3Ll4QKBgQD7+2SFbIoA/eZYVlPV\nMPSZshTMxExr/MplmVogm+14BSDr+75jjyDVQqL1CoEijTQR5+5BY6/ujscA3UPc\npKcqKq67H+BsMcQ5sqGLcjHwYC/jt3MUEvPB4K5QzNU+nLeos/diLINo9pOrae2V\nyKVImwZ/lto+u5ka0hhO5iPuqQKBgQDMdKjOaCYg9xSMSTbnsx3y8yM6oa87aecw\nKF1Y2u7FbN9EUDUtUEkjsR1a0zeFobB/uW7+oDlSq9QUsllLnEaBEsQS/uaBBWsr\nFKVdDy/wDG6r+uRwNURzpfF6xoNq48TjzvYnVmYENkobDikTlsST+JL4MzsBkFyL\n/a8FRGOPuwKBgFs6Pb9sd146jh2nS3yg172ZUpx76Ssjf2dfKNkresL8IFovb1N+\nKyXqlTLgFbabpqFg9cpou/ZDbNrsQLhuSDMk9tO6i7bAIcm92Wyx8FCVkmEANsKq\nxeOIY7PPJNkhRgDm/wZlFUJ4GyhxFlonJWfu8GBbDjKuGpUyQSi3e4TZAoGAKJmJ\n4+L+n1ExPWJUitIgwlvRxRTSTUQMap25W6mt/HpQI6qhxKvKulGzeJO01M501Ago\nqFt8xpPke2+nF8KipYLqeLMxZrGCxH1HESGw7UQqvfAGaNnLDAQJ3c2JzzIHqQ0y\nCEG55GA7ev/m3EL2KkQUO0FBGGBoYEwx8yPPeX0CgYEA21/7ePBLTKIl09dZuO9A\ngUf7MqGDb5rgi+dtNgPzxwtdPvkiq4d9dlxaU2ymrtb1x27QDPoQcdPZWnXdIF7I\neK/Q7JP4f6hfbael/ke+8FPVtGSLnkFOyFH8kMWGDZfKpl6hl+OimvukZeL8n4tJ\nX423lWCldv3SInvc9QYsS58=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-2q8gg@optiwaste-19300.iam.gserviceaccount.com",
  "client_id": "105022396569776097891",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-2q8gg%40optiwaste-19300.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}
  console.log('serviceAccount',serviceAccount);

  
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