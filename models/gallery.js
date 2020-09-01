const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Gallery = new Schema({
    picture: {
        type: String,
        required: true
    },
    caption: {
        type: String,
    },
    tripId: {
        type: Schema.Types.ObjectId,
        ref: "Trip"
    },
    created: { type: Date, required: true, default: Date.now() },
});

// User.plugin(passportLocalMongoose);

module.exports = mongoose.model('Gallery', Gallery);