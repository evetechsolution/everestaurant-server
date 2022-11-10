const mongoose = require('mongoose');


const DataSchema = mongoose.Schema({
    _id: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    tableName: {
        type: String,
        required: true
    },
    food: {
        type: String,
        required: true
    },
    variant: {
        type: Array
    },
    addOns: {
        type: Array
    },
    notes: {
        type: String
    },
    step: {
        type: Number,
        required: true
    }
})


//'Kitchens' is the table thats gonna show up in Mongo DB
module.exports = mongoose.model('Kitchens', DataSchema);