const mongoose =  require('mongoose');

const requestSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
    collector: { type: mongoose.Schema.Types.ObjectId, ref: 'Collector'},
    binId: { type: String, required: true },
    wasteType: { type: String, required: true },
    digitalAddress: { type: String, required: true },
    requestStatus: { type: String, enum: ['Unassigned', 'Pending', 'Accepted', 'Rejected'], default: 'Pending' },
    paymentStatus: { type: String, required: true, default: 'unpaid' },
}, {
    timestamps: true,
});

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;