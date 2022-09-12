const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const http = require("http");
const { Server } = require("socket.io");
require('dotenv/config');


const port = process.env.PORT || 5000;

const app = express();

//Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

//ROUTES
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/qrdata', require('./routes/qrdatas'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/promotions', require('./routes/promotions'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/products', require('./routes/products'));
app.use('/api/variants', require('./routes/variants'));
app.use('/api/ingredients', require('./routes/ingredients'));
app.use('/api/measurements', require('./routes/measurements'));
app.use('/api/payments', require('./routes/payments'));
app.use('/api/kitchens', require('./routes/kitchens'));
app.use('/api/bars', require('./routes/bars'));

const myServer = http.createServer(app);

const io = new Server(myServer, {
    cors: {
        origin: ["http://localhost:3060", "http://localhost:3000", "https://everestaurant.vercel.app", "https://everestaurant-clientorder.vercel.app"],
    },
});

io.on("connection", (socket) => {
    // console.log(`User Connected: ${socket.id}`);
    // console.log("User connected.");

    socket.on("sendKitchen", (data) => {
        socket.broadcast.emit("receiveKitchen", data);
    });

    socket.on("sendBar", (data) => {
        socket.broadcast.emit("receiveBar", data);
    });

    socket.on("disconnect", () => {
    });

});

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
// app.listen(port, () => {
myServer.listen(port, () => {
    console.log('Listening to port 5000;')
});