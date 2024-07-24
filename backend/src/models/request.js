const mongoose =  require('mongoose');

const requestSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
    collector: { type: mongoose.Schema.Types.ObjectId, ref: 'Collector'},
    binId: { type: String, required: true },
    wasteType: { type: String, required: true },
    // quantity: { type: Number, required: true },
    instructions: { type: String },
    address: { type: String, required: true }, //location in frontend
    requestStatus: { type: String, enum: ['Unassigned', 'Assigned', 'Pending', 'Accepted', 'Rejected'], default: 'Pending' },
    paymentStatus: { type: String, required: true, default: 'unpaid' },
}, {
    timestamps: true,
});

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;