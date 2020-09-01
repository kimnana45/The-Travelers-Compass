const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Budget = new Schema({
    reason: {
        type: String,
        trim: true,
        required: [true, 'Please state a reason for the expense/money']
    },
    amount: {
        type: Number,
        required: [true, 'Please add positive or negative number']
    },
    tripId: {
        type: Schema.Types.ObjectId,
        ref: "Trip"
    },
    users: Array,
    created: { type: Date, required: true, default: Date.now() },
});

// User.plugin(passportLocalMongoose);

module.exports = mongoose.model('Budget', Budget);