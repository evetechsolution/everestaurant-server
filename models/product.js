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
    category: {
        type: String
    },
    section: {
        type: String
    },
    description: {
        type: String
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    extraNotes: {
        type: Boolean,
        default: false
    },
    stock: {
        type: Number
    },
    ingredient: {
        type: Array
    },
    variant: {
        type: Array
    },
    addOns: {
        type: Array
    },
});

//'Products' is the table thats gonna show up in Mongo DB
module.exports = mongoose.model('Products', DataSchema);