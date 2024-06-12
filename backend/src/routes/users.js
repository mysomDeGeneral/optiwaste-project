const express = require('express');
const router = express.Router();
const { register, login, logout, getUserProfile, updateUserProfile } = require('../controllers/users');
const { protect } = require('../middlewares/auth');


router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/profile', getUserProfile);
router.put('/profile', protect, updateUserProfile);

module.exports = router;