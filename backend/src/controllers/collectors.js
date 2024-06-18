const Collector = require('../models/collector');
const generateToken = require('../utils/jwt');

exports.register = async (req, res) => {
    const { name, email, password, nationalId, licenseId, dob, wasteTypes, digitalAddress } = req.body;

    try {
        const collectorExists = await Collector.findOne({ email});

        if (collectorExists) {
            return res.status(400).json({ message: 'Collector already exists'});
        }

        const collector = new Collector({ name, email, password, nationalId, licenseId, dob, wasteTypes, digitalAddress });
        await collector.save();
        res.status(201).json({
            _id: collector._id,
            name: collector.name,
            email: collector.email,
            nationalId: collector.nationalId,
            licenseId: collector.licenseId,
            dob: collector.dob,
            wasteTypes: collector.wasteTypes,
            digitalAddress: collector.digitalAddress,
            token: generateToken(collector._id),
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error: ' + error});
    };
}

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
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
                digitalAddress: collector.digitalAddress,
                token: generateToken(collector._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password'});
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error: ' + error});
    }
}

exports.logout = async (req, res) => {
    res.json({ message: 'Logged out'});
}

exports.getCollectorProfile = async (req, res) => {
    const { email } = req.body;

    const collector = await Collector.findOne( {email });
    res.json({
        _id: collector._id,
        name: collector.name,
        email: collector.email,
        nationalId: collector.nationalId,
        licenseId: collector.licenseId,
        dob: collector.dob,
        wasteTypes: collector.wasteTypes,
        digitalAddress: collector.digitalAddress,
    });
}

exports.updateCollectorProfile = async (req, res) => {
    const { name, email, password, nationalId, licenseId, dob, wasteTypes, digitalAddress } = req.body;

    const collector = await Collector.findById(req.collector._id);

    if (collector) {
        collector.name = name || collector.name;
        collector.email = email || collector.email;
        collector.nationalId = nationalId || collector.nationalId;
        collector.licenseId = licenseId || collector.licenseId;
        collector.dob = dob || collector.dob;
        collector.wasteTypes = wasteTypes || collector.wasteTypes;
        collector.digitalAddress = digitalAddress || collector.digitalAddress;

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
            digitalAddress: collector.digitalAddress,
            token: generateToken(collector._id),
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
            res.json({ message: 'Collector removed' });
        } else {
            res.status(404).json({ message: 'Collector not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting collector', error: error.message });
    }
}

