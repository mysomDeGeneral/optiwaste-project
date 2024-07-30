const Collector = require('../models/collector');
const generateToken = require('../utils/jwt');

exports.register = async (req, res) => {
    const { name, email, password, nationalId, licenseId, dob, wasteTypes, address, mobile } = req.body;

    try {
        const collectorExists = await Collector.findOne({ email});

        if (collectorExists) {
            return res.status(400).json({ message: 'Collector already exists'});
        }

        const collector = new Collector({ name, email, password, nationalId, licenseId, dob, wasteTypes, address, mobile });
        await collector.save();
        res.status(201).json({
            _id: collector._id,
            name: collector.name,
            email: collector.email,
            nationalId: collector.nationalId,
            licenseId: collector.licenseId,
            dob: collector.dob,
            wasteTypes: collector.wasteTypes,
            address: collector.address,
            available: collector.available,
            mobile: collector.mobile,
            role: 'collector',
            token: generateToken(collector._id, role = 'collector'),
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error: ' + error});
    };
}

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log("email, password", email, password);
        const collector = await Collector.findOne({ email });
        
        if(collector && (await collector.matchPassword(password))) {
            res.json({
                _id: collector._id,
                name: collector.name,
                email: collector.email,
                nationalId: collector.nationalId,
                licenseId: collector.licenseId,
                dob: collector.dob,
                wasteTypes: collector.wasteTypes,
                address: collector.address,
                available: collector.available,
                mobile: collector.mobile,
                role : 'collector',
                token: generateToken(collector._id, role = 'collector'),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password'});
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error: ' + error});
    }
}

exports.getCollectors = async (req, res) => {
    const collectors = await Collector.find({});
    res.json(collectors);
}

exports.logout = async (req, res) => {
    res.json({ message: 'Logged out'});
}

exports.getCollectorProfile = async (req, res) => {
    try{
    const collector = await Collector.findById(req.collector._id);
    if (collector) {
        res.json({
            _id: collector._id,
            name: collector.name,
            email: collector.email,
            nationalId: collector.nationalId,
            licenseId: collector.licenseId,
            dob: collector.dob,
            wasteTypes: collector.wasteTypes,
            address: collector.address,
            available: collector.available,
            mobile: collector.mobile,
            pushSubscription: collector.pushSubscription,
            });
            }  
    else {
        res.status(404).json({ message: 'Collector not found'});
    }
    } catch (error) {
        res.status(500).json({ message: 'Error: ' + error});
    }
} 

exports.updateCollectorProfile = async (req, res) => {
    const { name, email, password, nationalId, licenseId, dob, wasteTypes, address, available, mobile } = req.body;

    const collector = await Collector.findById(req.collector._id);

    if (collector) {
        if (name !== undefined) collector.name = name;
        if (email !== undefined) collector.email = email;
        if (nationalId !== undefined) collector.nationalId = nationalId;
        if (licenseId !== undefined) collector.licenseId = licenseId;
        if (dob !== undefined) collector.dob = dob ;
        if (wasteTypes !== undefined) collector.wasteTypes = wasteTypes;
        if (address !== undefined) collector.address = address;
        if (available !== undefined) collector.available = available;
        if (mobile !== undefined) collector.mobile = mobile;

        if(password) {
            collector.password = password;
        }

        await collector.save();
        res.json({
            _id: collector._id,
            name: collector.name,
            email: collector.email,
            nationalId: collector.nationalId,
            licenseId: collector.licenseId,
            dob: collector.dob,
            wasteTypes: collector.wasteTypes,
            address: collector.address,
            available: collector.available,
            mobile: collector.mobile,
            role : 'collector',
            token: generateToken(collector._id, role = 'collector'),
        });
    }
    else {
        res.status(404).json({ message: 'Collector not found'});
    }
}

exports.deleteCollectorProfile = async (req, res) => {
    try {
        const collector = await Collector.findById(req.Collector._id);

        if (collector) {
            await collector.deleteOne();
            res.json({ message: 'Account deleted!' });
        } else {
            res.status(404).json({ message: 'Collector not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting collector', error: error.message });
    }
}

exports.updateFMCToken = async (req, res) => {
    const { fmcToken } = req.body;
    try {
        const collector = await Collector.findById(req.collector._id);
        if (collector) {
            if(fmcToken !== undefined) collector.fmcToken = fmcToken;
            await collector.save();
            res.json({ 
                fmcToken: collector.fmcToken,
                message: 'FMC token updated' 
            });
        } else {
            res.status(404).json({ message: 'Collector not found' });
        }
    } catch (error) {
        res.status(500).json({ message: "Error updating fmcToken"});
    }
}
