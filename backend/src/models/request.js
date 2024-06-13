const mongoose =  require('mongoose');

const requestSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    collector: { type: mongoose.Schema.Types.ObjectId, ref: 'Collector'},
    binId: { type: String, required: true },
    wasteType: { type: String, required: true },
    location: {
        latitude: { type: Number, required: true, min: -90, max: 90 },
        longitude: { type: Number, required: true, min: -180, max: 180 },
    },
    requestStatus: { type: String, required: true, default: 'pending' },
    paymentStatus: { type: String, required: true, default: 'unpaid' },
}, {
    timestamps: true,
});

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;