const mongoose = require('mongoose');

const PaymentSchema = mongoose.Schema({
    name: {
        type: String
    },
    card_number: {
        type: Number,
        default: null
    },
});

const DataSchema = mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
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