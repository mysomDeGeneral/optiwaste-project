const express = require('express');
const router = express.Router();
const { register, login, logout, getUserProfile, updateUserProfile, deleteUserProfile, getUsers } = require('../controllers/users');
const { protect } = require('../middlewares/auth');


router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/profile', protect, getUserProfile);
router.get('/', getUsers);
router.put('/profile', protect, updateUserProfile);
router.delete('/profile', protect, deleteUserProfile);

module.exports = router;

