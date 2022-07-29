const mongoose = require('mongoose');

const DataSchema = mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    qrKey: {
        type: String,
        required: true
    },
    tableName: {
        type: String,
        required: true
    },
    pax: {
        type: Number,
        required: true
    },
    image: {
        type: String
    },
    status: {
        type: String
    },
    
});

//'Qrdatas' is the table thats gonna show up in Mongo DB
module.exports = mongoose.model('Qrdatas', DataSchema);