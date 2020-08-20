const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Trip = new Schema({
    tripName: {
        type: String,
        required: 'Trip name is required',
        unique: true,
    },
    password: {
        type: String,
        required: 'Password for the trip is required'
    },
    location: {
        type: String,
        required: 'Location is required'
    },
    dates: {
        type: Date,
        required: 'Dates of trip is required'
    },
    users: Array,
    created: { type: Date, required: true, default: Date.now() },
});

// User.plugin(passportLocalMongoose);

module.exports = mongoose.model('Trip', Trip);