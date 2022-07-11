const mongoose = require('mongoose');

const DataSchema = mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
})

//'Customers' is the table thats gonna show up in Mongo DB
module.exports = mongoose.model('Customers', DataSchema);