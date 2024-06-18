const axios = require('axios');

exports.getLocation = async (req, res) => {
    const { digitalAddress } = req.body;

    if (!digitalAddress) {
        return res.status(400).json({ message: 'DigitalAddress is required' });
    }

    try {
        const response = await axios.post('https://localhost:9091/get-location', {
            address: digitalAddress,
        });

        const data = response.data;
        if (data.data && data.data.Table && data.data.Table.length > 0) {
            const locationData = data.data.Table[0];
            const result = {
                latitude: locationData.CenterLatitude,
                longitude: locationData.CenterLongitude,
            };
            return res.status(200).json(result);
        } else {
            return res.status(404).json({ message: 'Location not found' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.getDigitalAddress = async (req, res) => {
    const { latitude, longitude } = req.body;

    if (!latitude || !longitude) {
        return res.status(400).json({ message: 'Latitude and Longitude are required' });
    }

    try {
        const response = await axios.post('https://localhost:9091/get-address', {
            lat: latitude,
            long: longitude,
        });

        const data = response.data;
        if (data.data && data.data.Table && data.data.Table.length > 0) {
            const address = data.data.Table[0];
            const result = {
                digitalAddress: address.GPSName,
            };
            return res.status(200).json({ data: result });
        } else {
            return res.status(404).json({ message: 'Digital Address not found' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
