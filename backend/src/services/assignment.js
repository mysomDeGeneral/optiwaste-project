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
  "private_key_id": "82d806ef4ed60e8e1ef0b7cbb3de32c36417bf0d",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCbGNXOpVwYs6Jl\nnj96EW5N1yTQ3gZi78HcuKLeasXMKrpUnEzLBXoIFSiCmre7fPg0JQR6ofif+wng\nr+PCpVMiLmd3eiANOJ36q5v8PFjYbOrMG0t4oc5w++Z/x+Aam50Oyg60zkKzGLv9\n9RVpfR0SkHg3dCknZZ+l++SPuL9eIJWo1eguX91WMxLP7+fNJbJO8b7ZzFKN61XK\n16+036grruGMzDqlF8Ir+JHEYEFKGBqh8D/K+/PP7anSaY1TrFN7KAJzYKnVGEZY\n16plPp/orIq8xR5EejlUs7aNmBqwdsucfXhMlM+S+xMcYRdkopMow4hZCD5h2egl\nrf8LBVsZAgMBAAECggEAD9JopFIw6xmvLk3mlJew4Jq7KB4QOXlTNea1gbpTd4yf\n0cgYmujx/h9XcLxjFCqvYNVqZ668j+hyhWP4GIgYSx9AAZuZJ7QgBJ2LVf/bgeeZ\ni80YhcO+7T57UQuFOH2pt+OjvKzid8YFDocZIjfn1ngbtW+Bj8Hxl4OS+Vjr18iT\nSDMZnXG4DViEEnF7iPw1Fn3nKLTJI7zzDdOUDXP0s3jLD8nGEp10bUgKy+EwbUi7\nfVRWrnByJeiGzCzG7YuJOfwF3ep9/zV0W9yQZjA52bie/L0raXiB6gWWc2ESXtem\nMp8s9Q5Bb1vEguOkUeEpchyDq5CZ1WuaAv3nJvXiUQKBgQDHnB0vtZoFpQezanHY\n39ieePaIUSnRIU+SJvlM1yUootcvvzvDYlb8B4/MlEGgIhx1R7az/wFoRnvTuFoB\n6u6KbzNSwWOqdKS4TAMJXraKrhPFYsAQ+AuHb6HatRcDwsL7uCAewzgOBYx+CcdN\nY0kWJKvZ/d0JnR9gjciJZTC7kQKBgQDG6YghqRkHtiAh752tkrMnbHhyqTQYIeJ9\ntvr/w0OlcNMeEqDufACAzp++ZinO8GNFM3sTfCzWS9n9ZmB4CS627e+DXH1X1zaP\nMQhyL5Hvxcus/U+ajwTZK7i5EHYIc/bxxirZruryF3ayCKw1a6uZynYMXgowT8Bz\n+aM9OLMTCQKBgQDDHHn69IwFEHcijN2Tm9plrN9uB8fUP7dDqQzuay5LNkEYzthf\n93QHDm0lD5XGLRGcIekYsB50CtFm9kAkt7tLXb7RGW+OYk3QR5yAQDA2BkoVGp2a\n+JpsXFXdLj2801c8LZJX/4J/UjUtzekeX/pExrukbVzt1MOi4XQvuNWVwQKBgBEI\ndmvLeyU5506AolP2t/isRTQsYRWf8TEqthuosOY93xY4KifB3pkpGGzJetMJqraG\nTgfBHmXLYQNd/OzKfIGVpmjtRp57A2UHod2FTU3m9iX+Gw71KEkggVT3n+PhakgR\n3CF/5QaOE8/zBiwc6DjnKWytsNmqOqSzv9LCRDNhAoGBAKGKMdzWd3TmAHFBFKJg\nLxHX6WhCT12+o/mYmKs/BuX8m6Taa6w5rsFkcWRUpOjcIpFMMIonPdNe1nCSa4B0\nFdrt+wk5w9JEoKVr7V0/TyWZ847pY1kB+mih4jSW8LglyKuMm5h8l8seP/HQFtRK\nLM3odw3+n1bfS2aCoI6nODPO\n-----END PRIVATE KEY-----\n",
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