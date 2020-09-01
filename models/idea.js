const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ideaSchema = new Schema({
	toDo: { 
		type: String, 
		required: true,
		trim: true
	},
	address: { 
		type: Object, 
		required: true,
		unique: true
	},
	user: { type: Object, required: true },
	numFavorited: Number,
    tripId: {
		type: Schema.Types.ObjectId,
		ref: "Trip"
	},
	date: { type: Date, default: Date.now }
    });

const Idea = mongoose.model('Idea', ideaSchema);

module.exports = Idea;
