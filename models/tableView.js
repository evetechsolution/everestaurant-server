const mongoose = require('mongoose');

const DataSchema = mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    id: {
        type: Number,
        required: true
    },
    type: {
        type: String
    },
    number: {
        type: String
    },
    
});

//'TableViews' is the table thats gonna show up in Mongo DB
module.exports = mongoose.model('TableViews', DataSchema);