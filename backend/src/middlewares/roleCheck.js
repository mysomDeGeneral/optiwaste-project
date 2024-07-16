module.exports = (roles) => (req, res, next) => {
    const role = req.user ? req.user.role : 'collector';

    if (!roles.includes(role)) {
        return res.status(403).json({ message: 'Forbidden' });
    }
    next();
};