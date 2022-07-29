const mongoose = require('mongoose');

const DataSchema = mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    staff: {
        type: String,
    },
    qrKey: {
        type: String
    },
    tableName: {
        type: String
    },
    pax: {
        type: Number
    },
    orders: {
        type: Array,
        required: true
    },
    orderType: {
        type: String
    },
    status: {
        type: String
    },
    billedAmount: {
        type: Number
    },
    payment: {
        type: String
    },
    cardNumber: {
        type: String
    },
    notes: {
        type: String
    },
})

//'Orders' is the table thats gonna show up in Mongo DB
module.exports = mongoose.model('Orders', DataSchema);