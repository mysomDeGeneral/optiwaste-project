const Collector = require('../models/collector');
const Request = require('../models/request');

async function assignCollectorToRequest(requestId, rejectedCollectorId = null) {
    try {
        const request = await Request.findById(requestId);
        if (!request) {
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
        }

        await request.save();

        return request;
    } catch (error) {
        throw error;
    }
}

module.exports = { assignCollectorToRequest };