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
    image: {
        type: String
    },
    imageId: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    listNumber: {
        type: Number,
        required: true
    },
});

//'Banners' is the table thats gonna show up in Mongo DB
module.exports = mongoose.model('Banners', DataSchema);