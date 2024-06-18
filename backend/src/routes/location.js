const express = require('express');
const router = express.Router();
const { getLocation, getDigitalAddress } = require('../apis/ghanaPostGPS');

router.post('/get-location', getLocation);
router.post('/get-address', getDigitalAddress);

module.exports = router