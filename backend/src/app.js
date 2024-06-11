const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const userRoutes = require('./routes/users');
const collectorRoutes = require('./routes/collectors');

dotenv.config();
connectDB();


app.use(bodyParser.json());

app.use('/api/users', userRoutes);
app.use('/api/collectors', collectorRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


