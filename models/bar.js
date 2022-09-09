const mongoose = require('mongoose');


const DataSchema = mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    tableName: {
        type: String,
        required: true
    },
    drink: {
        type: String,
        required: true
    },
    step: {
        type: Number,
        required: true
    }
})


//'Bars' is the table thats gonna show up in Mongo DB
module.exports = mongoose.model('Bars', DataSchema);