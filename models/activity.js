const mongoose = require('mongoose');

const DataSchema = mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: String,
        required: true
    },
    table: {
        type: String,
    },
    customer: {
        name: {
            type: String,
        },
        phone: {
            type: String,
        },
    },
    product: {
        type: Array,
        required: true
    },
    total: {
        type: Number
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    payment: {
        name: {
            type: String,
        },
        cardNumber: {
            type: Number
        },
    },
})

//'Activities' is the table thats gonna show up in Mongo DB
module.exports = mongoose.model('Activities', DataSchema);