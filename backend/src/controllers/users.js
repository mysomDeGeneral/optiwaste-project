const User = require('../models/user');
const generateToken = require('../utils/jwt');

exports.register = async (req, res) => {
    const { name, email, password, address, mobile } = req.body;

    try {
        const userExists = await User.findOne({ email});

        if (userExists) {
            return res.status(400).json({ message: 'User already exists'});
        }

        const user = new User({ name, email, password, address, mobile });
        await user.save();
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            address: user.address,
            mobile: user.mobile,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ message: 'Error: ' + error});
    };
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        
        if(user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                address: user.address,
                mobile: user.mobile,
                token: generateToken(user._id),
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

exports.getUserProfile = async (req, res) => {
    const {email} = req.body;

    const user = await User.findOne({ email });
    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
        mobile: user.mobile,
    });
}
