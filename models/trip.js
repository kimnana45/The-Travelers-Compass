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
        type: Array,
        required: 'Location is required'
    },
    dates: {
        type: Object,
        required: 'Dates of trip is required'
    },
    pictures: [
        {
            type: Schema.Types.ObjectId,
            ref: "Gallery"
        }
    ],
    users: Array,
    created: { type: Date, required: true, default: Date.now() },
});

// User.plugin(passportLocalMongoose);

module.exports = mongoose.model('Trip', Trip);