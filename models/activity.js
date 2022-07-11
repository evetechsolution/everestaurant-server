const mongoose = require('mongoose');

const PaymentSchema = mongoose.Schema({
    name: {
        type: String
    },
    cardNumber: {
        type: Number
    },
});

const DataSchema = mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: String,
        required: true
    },
    customerId: {
        type: String,
        required: true
    },
    product: {
        type: Array,
        required: true
    },
    notes: {
        type: String
    },
    total: {
        type: Number
    },
    payment: PaymentSchema,
});

//'Activities' is the table thats gonna show up in Mongo DB
module.exports = mongoose.model('Activities', DataSchema);