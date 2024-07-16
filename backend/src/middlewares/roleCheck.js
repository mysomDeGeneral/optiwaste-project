module.exports = (roles) => (req, res, next) => {
    const role = req.user ? req.user.role : 'collector';
    console.log('role',role);

    if (!roles.includes(role)) {
        return res.status(403).json({ message: 'Forbidden' });
    }
    next();
};


