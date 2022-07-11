const mongoose = require('mongoose');


const DataSchema = mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        required: true
    }
})


//'Measurements' is the table thats gonna show up in Mongo DB
module.exports = mongoose.model('Measurements', DataSchema);