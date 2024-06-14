const express = require('express');
const router = express.Router();
const { createRequest, getRequests, getRequest, updateRequest, deleteRequest, acceptRequest, rejectRequest } = require('../controllers/requests');
const { protect } = require('../middlewares/auth');

router.post('/', protect, createRequest);
router.get('/', protect, getRequests);
router.get('/:id', protect, getRequest);
router.put('/:id', protect, updateRequest);
router.delete('/:id', protect, deleteRequest);
router.put('/:id/accept', protect, acceptRequest);
router.put('/:id/reject', protect, rejectRequest);

module.exports = router;
