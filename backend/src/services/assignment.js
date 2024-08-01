const webPush = require('web-push');
const Request = require('../models/request');
const Collector = require('../models/collector');
const { getLocationCoordinates } = require('../apis/ghanaPostGPS')

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
            await Request.findByIdAndUpdate(
                request._id,
                {
                    $set: {
                        collector: null,
                        requestStatus: 'Unassigned'
                    }
                },
                { new: true, runValidators: true }
            );
            return request;
        } 

            // request.collector = suitableCollectors[0]._id;

            const requestCoordinates = await getLocationCoordinates(request.address);

            const collectorsWithDistances = await Promise.all(suitableCollectors.map(async (collector) => {
                const collectorCoordinates = await getLocationCoordinates(collector.address);
                const distance = calculateDistance(requestCoordinates, collectorCoordinates);
                return { collector, distance };
            }));

            collectorsWithDistances.sort((a, b) => a.distance - b.distance);

            const nearestCollector = collectorsWithDistances[0].collector;
            // request.collector = nearestCollector._id;
            // request.requestStatus = 'Assigned';
            const updatedRequest = await Request.findByIdAndUpdate(
                request._id,
                {
                    $set: {
                        requestStatus: 
                            "Assigned",
                        collector: nearestCollector._id,       
                    }
                },
                
                { new: true, runValidators: true }
            );

            const assignedCollector = await Collector.findById(request.collector);

            if (assignedCollector && assignedCollector.pushSubscription) {
                console.log('Sending push notification');
                try { 
                const pushSubscription = assignedCollector.pushSubscription;
                const payload = JSON.stringify({
                    title: 'New Waste Collection Request',
                    message: `You have been assigned a new request at ${request.address}`,
                    requestId: updatedRequest._id.toString(),
                });

                    await webPush.sendNotification(assignedCollector.pushSubscription, payload);
                    console.log('Push notification sent successfully');
                } catch (error) {
                    console.error('Error sending push notification:', error);
                }
            }
        

        
        return updatedRequest;
    } catch (error) {
        console.error('Error in assignCollectorToRequest:', error);
        throw error;
    }
}


function calculateDistance(coord1, coord2) {
    const R = 6371; 
    const dLat = (coord2.lat - coord1.lat) * Math.PI / 180;
    const dLon = (coord2.lng - coord1.lng) * Math.PI / 180;
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(coord1.lat * Math.PI / 180) * Math.cos(coord2.lat * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c; 
    return distance;
}

module.exports = { assignCollectorToRequest };