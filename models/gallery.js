const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Gallery = new Schema({
    picture: {
        type: String,
    },
    caption: {
        type: String,
    },
    users: Array,
    created: { type: Date, required: true, default: Date.now() },
});

// User.plugin(passportLocalMongoose);

module.exports = mongoose.model('Gallery', Gallery);