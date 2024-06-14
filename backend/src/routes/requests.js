const express = require('express');
const router = express.Router();
const { createRequest, getRequests } = require('../controllers/requests');
const { protect } = require('../middlewares/auth');

router.post('/', protect, createRequest);
router.get('/', protect, getRequests);

module.exports = router;
