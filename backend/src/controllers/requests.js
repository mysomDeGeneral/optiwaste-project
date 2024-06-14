const Request = require('../models/request');
const { assignCollectoroRequest } = require('../services/assignment');

exports.createRequest = async (req, res) => {
    try {
        const { binId, wasteType, location } = req.body;

        const request = new Request({
            user: req.user._id,
            binId,
            wasteType,
            location,
        });

        await request.save();

        const assignedRequest = await assignCollectoroRequest(request._id);

        res.status(201).json(assignedRequest);
    } catch (error) {
        res.status(500).json({ message: 'Error creating request' });
    }
}

exports.getRequests = async (req, res) => {
    try {
        const requests = await Request.find({ user: req.user._id });
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: 'Error getting requests' });
    }
}

