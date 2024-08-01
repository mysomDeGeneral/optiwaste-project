const Request = require('../models/request');
const Collector = require('../models/collector');
const User = require('../models/user');
const { assignCollectorToRequest } = require('../services/assignment');

exports.createRequest = async (req, res) => {
    const wasteTypeAmount = [
        { "plastic" : 10 },
        { "paper": 10 },
        { "glass": 12 },
        { "metal": 15 },
        { "domestic": 10 },
        { "e-waste": 15 },
        { "hazardous": 20 },
        { "construction": 25 },
      ];
    try {
        const { binId, wasteType, address, instructions } = req.body;

         const matchingWasteType = wasteTypeAmount.find(item => Object.keys(item)[0] === wasteType);
        
        if (!matchingWasteType) {
            return res.status(400).json({ message: 'Invalid waste type' });
        }

        const amount = matchingWasteType[wasteType];

        const request = new Request({
            user: req.user._id,
            binId,
            wasteType,
            address,
            instructions, 
            amount
        });

        await request.save();

        // const assignedRequest = await assignCollectorToRequest(request._id);

        res.status(201).json(request);
    } catch (error) {
        res.status(500).json({ message: 'Error creating request', error: error.message});
    }
}

exports.getRequests = async (req, res) => {
    try {
        let requests;
        if (req.user) {
            if (req.user.role === 'admin') {
                requests = await Request.find();
            } else {
                requests = await Request.find({ user: req.user._id });
            }
        } else if (req.collector) {
            requests = await Request.find({ collector: req.collector._id });
        } else {
            res.status(403).json({ message: 'Unauthorized' });
        }

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
    const { requestStatus} = req.body;

    try {
        const request = await Request.findById(req.params.id);

        if (request) {
            if (requestStatus !== undefined) request.requestStatus  = requestStatus;
            await request.save();
            res.json(request);
        } else {
            res.status(404).json({ message: 'Request not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating request', error: error.message});
    }
}

exports.updateFeedback = async (req, res) => {
    const { feedbackComment } = req.body;

    try {
        const request = await Request.findById(req.params.id);

        if (request) {
            if (feedbackComment !== undefined) request.feedbackComment  = feedbackComment;
            await request.save();
            res.json(request);
        } else {
            res.status(404).json({ message: 'Request not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating request', error: error.message});
    }
}

exports.updatePaymentStatus = async (id, status) => {
    try {
        const request = await Request.findById(id);

        if (request) {
            request.paymentStatus = status;
            await request.save();
            console.log('status',request.paymentStatus);
        }
    } catch (error) {
        console.error('Error updating payment status:', error);
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
