const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const { connectDB, connectOnlineDB } = require('./config/db');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const userRoutes = require('./routes/users');
const collectorRoutes = require('./routes/collectors');
const requestRoutes = require('./routes/requests');
const locationRoutes = require('./routes/location');
const paymentRoutes = require('./routes/payment');
const verifyToken = require('./utils/jwt')
const cors = require('cors');


// connectDB();
connectOnlineDB();

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    // origin: '0.0.0.0',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);
app.use('/api/collectors', collectorRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/location', locationRoutes);
app.get('/api/verify-user', verifyToken);
app.use('/api/payments', paymentRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


