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
        min: 8,
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
    pictures: [
        {
            type: Schema.Types.ObjectId,
            ref: "Gallery"
        }
    ],
    users: [ 
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    created: { type: Date, required: true, default: Date.now() },
});

// User.plugin(passportLocalMongoose);

module.exports = mongoose.model('Trip', Trip);