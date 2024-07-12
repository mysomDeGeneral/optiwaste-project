const axios = require('axios');
const qs = require('qs');

exports.getLocation = async (req, res) => {
  const { DigitalAddress } = req.body;

  if (!DigitalAddress) {
    return res.status(400).json({ message: 'DigitalAddress is required' });
  }

  const data = qs.stringify({ address: DigitalAddress });

  try {
    const response = await axios.post('http://localhost:9091/get-location', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const responseData = response.data;
    if (responseData.data && responseData.data.Table && responseData.data.Table.length > 0) {
      const locationData = responseData.data.Table[0];
      const result = {
        latitude: locationData.CenterLatitude,
        longitude: locationData.CenterLongitude,
        district: locationData.District,
        region: locationData.Region,
      };
      return res.status(200).json(result);
    } else {
      return res.status(404).json({ message: 'Location data not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching location data', error: error.message });
  }
};

exports.getDigitalAddress = async (req, res) => {
  const { latitude, longitude } = req.body;

  if (!latitude || !longitude) {
    return res.status(400).json({ message: 'Latitude and Longitude are required' });
  }

  const data = qs.stringify({ lat: latitude, long: longitude });

  try {
    const response = await axios.post('http://localhost:9091/get-address', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const responseData = response.data;
    if (responseData.data && responseData.data.Table && responseData.data.Table.length > 0) {
      const addressData = responseData.data.Table[0];
      const result = {
        DigitalAddress: addressData.GPSName,
      };
      return res.status(200).json(result);
    } else {
      return res.status(404).json({ message: 'Address data not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching address data', error: error.message });
  }
};

