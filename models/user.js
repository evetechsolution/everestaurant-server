const mongoose = require('mongoose');

const DataSchema = mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    username: {
        type: String,
        required: true
    },
    fullname: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    
});

//'Users' is the table thats gonna show up in Mongo DB
module.exports = mongoose.model('Users', DataSchema);