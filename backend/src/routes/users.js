const express = require('express');
const router = express.Router();
const { register, login, logout, getUserProfile } = require('../controllers/users');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/profile', getUserProfile);

module.exports = router;