const axios = require('axios');
const qs = require('qs');
// dotenv.config();

ghanpostapi = process.env.GHANAPOSTAPI_URI || ''
baseURL = process.env.BASE_URL

exports.getLocation = async (req, res) => {
  const { address } = req.body;

  if (!address) {
    return res.status(400).json({ message: 'address is required' });
  }

    const data = qs.stringify({ address: address });

    try {
      const response = await axios.post(`${ghanpostapi}/get-location`, data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const responseData = response.data;
      if (responseData.data && responseData.data.Table && responseData.data.Table.length > 0) {
        const locationData = responseData.data.Table[0];
        const result = {
          lat: locationData.CenterLatitude,
          lng: locationData.CenterLongitude,
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
      const response = await axios.post(`${ghanpostapi}/get-address`, data, {
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const responseData = response.data;
    if (responseData.data && responseData.data.Table && responseData.data.Table.length > 0) {
      const addressData = responseData.data.Table[0];
      const result = {
        address: addressData.GPSName,
      };
      return res.status(200).json(result);
    } else {
      return res.status(404).json({ message: 'Address data not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching address data', error: error.message });
  }
};


exports.getLocationCoordinates = async (address) => {
  console.log('Fetching coordinates for address:', address);

  try {
    const response = await axios.post(`${ghanpostapi}/get-location`, { address }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const responseData = response.data;
      if (responseData.data && responseData.data.Table && responseData.data.Table.length > 0) {
        const locationData = responseData.data.Table[0];
        return {
          lat: locationData.CenterLatitude,
          lng: locationData.CenterLongitude,
        };
    }
    throw new Error('Location data not found in response');
  } catch (error) {
    console.error('Error fetching location data:', error.message);
    throw error;
  }
};
