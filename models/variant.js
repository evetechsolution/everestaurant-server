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
    options: {
        type: Array,
        required: true
    }
})

//'Variants' is the table thats gonna show up in Mongo DB
module.exports = mongoose.model('Variants', DataSchema);