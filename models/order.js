const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const DataSchema = mongoose.Schema({
    _id: {
        type: String
    },
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
    customer: {
        name: String,
        phone: String,
        address: String,
        notes: String
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
    tax: {
        type: Number
    },
    deliveryPrice: {
        type: Number
    },
    billedAmount: {
        type: Number
    },
    downPayment: {
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
    }
});

DataSchema.plugin(mongoosePaginate);

//'Orders' is the table thats gonna show up in Mongo DB
module.exports = mongoose.model('Orders', DataSchema);