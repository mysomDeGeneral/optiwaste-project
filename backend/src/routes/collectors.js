const express = require('express');
const router = express.Router();
const { register, login, logout,getCollectorProfile, updateCollectorProfile } = require('../controllers/collectors');
const { protect } = require('../middlewares/auth');


router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/profile', getCollectorProfile);
router.put('/profile', protect, updateCollectorProfile);

module.exports = router;
