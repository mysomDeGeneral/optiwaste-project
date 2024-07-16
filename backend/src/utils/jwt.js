const jwt = require('jsonwebtoken');

const generateToken = (id, role) => { 
    const token = jwt.sign({ id, role}, process.env.JWT_SECRET, {expiresIn: '30d'});
    return token;
};


const verifyToken = async (req, res) => {
    let token, role;


    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            role = decoded.role;
            console.log("backend role", role);
            res.json(role);
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed'});
        }
    }

    if(!token) {
        res.status(401).json({ message: 'Not authorized, no token'});
    }
}


module.exports = generateToken, verifyToken;