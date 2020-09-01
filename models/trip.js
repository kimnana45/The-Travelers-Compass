const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Trip = new Schema({
    tripName: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        min: 6,
        trim: true
    },
    location: {
        type: Array,
        required: true
    },
    dates: {
        type: Object,
        required: true
    },
    uniqueCode: {
        type: String,
        required: true
    },
    lodging: {
        service: String,
        address: String,
        wifiInfo: {
            name: String,
            password: String
        },
        checkIn: Date,
        checkOut: Date
    },
    flight: {
        airline: String,
        flightNo: Number,
        departing: {
            airport: String,
            date: Date,
            time: String,
            seat: String
        },
        arriving: {
            airport: String,
            date: Date,
            time: String,
            seat: String
        }
    },
    pictures: [
        {
            type: Schema.Types.ObjectId,
            ref: "Gallery"
        }
    ],
    creator: {
            type: Schema.Types.ObjectId,
            ref: "User"
    },
    travelers: [ 
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    toDoIdeas: [
        {
            type: Schema.Types.ObjectId,
            ref: "Idea"
        }
    ],
    favoriteIdeas: [
        {
            type: Schema.Types.ObjectId,
            ref: "Idea"
        }
    ],
    created: { type: Date, required: true, default: Date.now() },
});

// User.plugin(passportLocalMongoose);

module.exports = mongoose.model('Trip', Trip);