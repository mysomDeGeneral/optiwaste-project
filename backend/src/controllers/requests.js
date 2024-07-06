const Request = require('../models/request');
const { assignCollectorToRequest } = require('../services/assignment');

exports.createRequest = async (req, res) => {
    try {
        const { binId, wasteType, digitalAddress } = req.body;

        const request = new Request({
            user: req.user._id,
            binId,
            wasteType,
            digitalAddress,
        });

        await request.save();

        const assignedRequest = await assignCollectorToRequest(request._id);

        res.status(201).json(assignedRequest);
    } catch (error) {
        res.status(500).json({ message: 'Error creating request', error: error.message});
    }
}

exports.getRequests = async (req, res) => {
    try {
        const requests = await Request.find();

        if (requests.length === 0) {
            res.status(404).json({ message: 'No requests found' });
        } else {
            res.json(requests);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error getting requests', error: error.message});
    }
}

exports.getRequest = async (req, res) => {
    try {
        const request = await Request.findById(req.params.id);

        if (!request) {
            res.status(404).json({ message: 'Request not found' });
        } else{
            res.json(request); 
        }
         
    } catch (error) {
        res.status(500).json({ message: 'Error getting request', error: error.message});
    }
}

exports.updateRequest = async (req, res) => {
    const { requestStatus, digitalAddress } = req.body;

    try {
        const request = await Request.findById(req.params.id);

        if (request) {
            request.requestStatus = requestStatus || request.requestStatus;
            request.digitalAddress = digitalAddress || request.digitalAddress;
            await request.save();
            res.json(request);
        } else {
            res.status(404).json({ message: 'Request not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating request', error: error.message});
    }
}

exports.deleteRequest = async (req, res) => {
    try {
        const request = await Request.findById(req.params.id);

        if (request) {
            await request.deleteOne();
            res.json({ message: 'Request removed' });
        } else {
            res.status(404).json({ message: 'Request not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting request', error: error.message });
    }
};

exports.acceptRequest = async (req, res) => {
    try {
        const request = await Request.findById(req.params.id);

        if(request && request.collector.equals(req.collector._id)) {
            request.requestStatus = 'Accepted';
            await request.save();
            res.json({message: 'Request accepted', request});
        } else {
            res.status(404).json({ message: 'Request not found or you are not assigned to this request' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error accepting request', error: error.message });
    }
}

exports.rejectRequest = async (req, res) => {
    try {
        const request = await Request.findById(req.params.id);

        if(request && request.collector.equals(req.collector._id)) {
            request.requestStatus = 'Rejected';
            await request.save();

            await assignCollectorToRequest(request._id , req.collector._id);

            res.json({message: 'Request rejected and reassigned if possible', request});
        } else {
            res.status(404).json({ message: 'Request not found or you are not assigned to this request' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error rejecting request', error: error.message });
    }
}
