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
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User"
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
    flights: [
        {
            user: String,
            airline: String,
            flightNo: String,
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
        }
    ],
    pictures: [
        {
            src: {
                type: String,
                required: true,
            },
            caption: String
        }
    ],
    travelers: [ 
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    toDos: [
        {
            idea: {
				type: String,
				required: true
			},
			address: { 
				type: Object, 
                required: true,
                unique: true
			},
			user: { type: Object, required: true },
			mustDo: Boolean,
			suggestion: Boolean
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