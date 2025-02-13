const express = require('express');
const router = express.Router();
const { createRequest, getRequests, getRequest, updateRequest, deleteRequest, acceptRequest, rejectRequest, updateFeedback } = require('../controllers/requests');
const { protect } = require('../middlewares/auth');
const roleCheck = require('../middlewares/roleCheck');

router.post('/', protect, createRequest);
router.get('/', protect, getRequests);
router.get('/:id', protect, getRequest);
router.put('/:id', protect, updateRequest);
router.put('/feedback/:id', protect, updateFeedback);
router.delete('/:id', protect, deleteRequest);
router.put('/:id/accept', protect, acceptRequest);
router.put('/:id/reject', protect, rejectRequest);

module.exports = router;
