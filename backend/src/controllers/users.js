const User = require('../models/user');
const generateToken = require('../utils/jwt');

exports.register = async (req, res) => {
    const { name, email, password, address, mobile, role } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = new User({ name, email, password, address, mobile, role });
        await user.save();
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            address: user.address,
            mobile: user.mobile,
            role: user.role,
            token: generateToken(user._id, user.role),
        });
    } catch (error) {
        res.status(500).json({ message: 'Error: ' + error });
    };
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log("email:", email, "password:", password);
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            console.log("user logged in successfully!");
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                address: user.address,
                mobile: user.mobile,
                role: user.role,
                token: generateToken(user._id, user.role),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error: ' + error });
    }
}

exports.logout = async (req, res) => {
    res.json({ message: 'Logged out' });
}

exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (user) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                address: user.address,
                mobile: user.mobile,
                role: user.role,
                dateJoined: user.createdAt,
            });
        } else {
            res.status(404).json({ message: 'User not found' })
        }

    } catch (error) {
        console.log("failed to get user profile:", error.message)
    }
}

exports.updateUserProfile = async (req, res) => {
    const { name, email, password, address, mobile, role } = req.body;

    const user = await User.findById(req.user._id);

    if (user) {
        user.name = name || user.name;
        user.email = email || user.email;
        user.address = address || user.address;
        user.mobile = mobile || user.mobile;
        user.role = role || user.role;

        if (password) {
            user.password = password;
        }

        await user.save();
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            address: user.address,
            mobile: user.mobile,
            role: user.role,
            token: generateToken(user._id, user.role),
        });
    }
    else {
        res.status(404).json({ message: 'User not found' });
    }
}

exports.deleteUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.User._id);

        if (user) {
            await user.deleteOne();
            res.json({ message: 'User removed' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
}


exports.getUsers = async (req, res) => {
    const users = await User.find({});
    res.json(users);
}
