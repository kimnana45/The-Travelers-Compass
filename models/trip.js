const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TripInfo = new Schema({
    tripName: {
        type: String,
        required: 'Trip name is required',
        unique: true,
    },
    location: {
        type: String,
        required: 'Location is required'
    },
    dates: {
        type: Date,
        required: 'Dates of trip is required'
    },
    numberOfPeople: {
        type: Number,
        required: 'Number of peop'
    },
    created: { type: Date, required: true, default: Date.now() },
});

// User.plugin(passportLocalMongoose);

module.exports = mongoose.model('TripInfo', TripInfo);