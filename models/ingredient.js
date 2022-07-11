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
    umeaId: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    stockAlert: {
        type: Boolean,
    },
    stockMinimum: {
        type: Number,
    }
})

//'Ingredients' is the table thats gonna show up in Mongo DB
module.exports = mongoose.model('Ingredients', DataSchema);