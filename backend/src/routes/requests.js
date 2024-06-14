const express = require('express');
const router = express.Router();
const { createRequest, getRequests, getRequest, updateRequest, deleteRequest } = require('../controllers/requests');
const { protect } = require('../middlewares/auth');

router.post('/', protect, createRequest);
router.get('/', protect, getRequests);
router.get('/:id', protect, getRequest);
router.put('/:id', protect, updateRequest);
router.delete('/:id', protect, deleteRequest);

module.exports = router;
