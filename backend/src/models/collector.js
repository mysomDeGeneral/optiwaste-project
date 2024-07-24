const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const calculateAge = (dob) => {
    const ageDiffMs = Date.now() - new Date(dob).getTime();
    const ageDate = new Date(ageDiffMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
};

const MINIMUN_AGE = 24;


const collectorSchema = new mongoose.Schema({
    name : { type: String, required: true },
    email : { type: String, required: true, unique: true },
    password : { type: String, required: true },
    nationalId : { type: String, required: true, unique: true },
    licenseId : { type: String, required: true, unique: true },
    dob : { type: Date, required: true , validate: {
        validator: function(value){
            return calculateAge(value) >= MINIMUN_AGE;
        },
        message: `Collector must be at least ${MINIMUN_AGE} years old.`,
    },},
    mobile: { type: String},
    available: { type: Boolean, required: true, default: true },
    wasteTypes: [{ type: String, required: true }],
    address: { type: String, required: true },
}, {
    timestamps: true,
});

collectorSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

collectorSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const Collector = mongoose.model('Collector', collectorSchema);

module.exports = Collector;
