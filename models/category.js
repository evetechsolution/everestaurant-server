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
    listNumber: {
        type: Number,
        required: true
    },
    image: {
        type: String
    },
})


//'Categories' is the table thats gonna show up in Mongo DB
module.exports = mongoose.model('Categories', DataSchema);