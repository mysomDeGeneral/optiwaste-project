const request = require('request');

exports.getLocation = async (req, res) => {
    const { DigitalAddress } = req.body;

    if(!DigitalAddress) {
        return res.status(400).json({ message: 'DigitalAddress is required' });
    }

    const options = {
        method: 'POST',
        url: 'https://localhost:9091/get-location',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        form: {
            address: DigitalAddress,
        },
    };

    request(options, (error, response) => {
        if(error) {
            return res.status(500).json({ message: error.message });
        }

        try{
            const data = JSON.parse(response.body);
            if(data.data && data.data.Table && data.data.Table.length > 0) {
                const locationData = data.data.Table[0];
                const result = {
                    latitude: locationData.CenterLatitude,
                    longitude: locationData.CenterLongitude,
            };
            return res.status(200).json({ data: result });
        } else {
            return res.status(404).json({ message: 'Location not found' });
        }
    } catch(error) {
        return res.status(500).json({ message: error.message });
        }
    });
};

exports.getDigitalAddress = async (req, res) => {
    const { latitude, longitude } = req.body;

    if(!latitude || !longitude) {
        return res.status(400).json({ message: 'Latitude and Longitude are required' });
    }

    const options = {
        method: 'POST',
        url: 'https://localhost:9091/get-address',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        form: {
            lat: latitude,
            long: longitude,
        },
    };

    request(options, (error, response) => {
        if(error) {
            return res.status(500).json({ message: error.message });
        }

        try{
            const data = JSON.parse(response.body);
            if(data.data && data.data.Table && data.data.Table.length > 0) {
                const address = data.data.Table[0];
                const result = {
                    digitalAddress: address.GPSName,
                };
                return res.status(200).json({ data: result });
            } else {
                return res.status(404).json({ message: 'Digital Address not found' });
            }
        } catch(error) {
            return res.status(500).json({ message: error.message });
        }
    });
}