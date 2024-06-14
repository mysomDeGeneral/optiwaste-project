const Collector = require('../models/collector');
const Request = require('../models/request');

async function assignCollectoroRequest(requestId) {
    try {
        const request = await Request.findById(requestId);
        if (!request) {
            throw new Error('Request not found');
        }

        const suitableCollectors = await Collector.find({
            available: true,
            wasteTypes: { $in: [request.wasteType]},
        });

        if (suitableCollectors.length === 0) {
            throw new Error('No collectors available');
        }

        request.collector = suitableCollectors[0]._id;
        request.requestStatus = 'assigned';
        await request.save();

        return request;
    } catch (error) {
        throw error;
    }
}

module.exports = { assignCollectoroRequest };