const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');


const port = process.env.PORT || 5000;

const app = express();

//Middlewares
app.use(cors());
app.use(bodyParser.json());

//ROUTES
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/qrdata', require('./routes/qrdatas'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/products', require('./routes/products'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/ingredients', require('./routes/ingredients'));
app.use('/api/measurements', require('./routes/measurements'));

app.get('/', (req, res) => {
    res.send('We are on home');
});

//connect to MongoDB
try {
    mongoose.connect(process.env.DB_CONNECTION, console.log('Monggo DB Connected !'));
} catch (error) {
    console.log('Monggo DB Not Connected :' + error);
}
//How we start listening to the server
app.listen(port, () => {
    console.log('Listening to port 5000;')
});