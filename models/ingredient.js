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
    measure: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    stockMinimum: {
        type: Number,
        required: true
    }
})

//'Ingredients' is the table thats gonna show up in Mongo DB
module.exports = mongoose.model('Ingredients', DataSchema);