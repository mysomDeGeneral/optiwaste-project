const express = require('express');
const router = express.Router();
const { register, login, logout,getCollectorProfile, updateCollectorProfile, deleteCollectorProfile, getCollectors } = require('../controllers/collectors');
const { protect } = require('../middlewares/auth');


router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/profile', protect, getCollectorProfile);
router.get('/', getCollectors);
router.put('/profile', protect, updateCollectorProfile);
router.delete('/profile', protect, deleteCollectorProfile);

module.exports = router;
