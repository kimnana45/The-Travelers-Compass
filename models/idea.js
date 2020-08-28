const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ideaSchema = new Schema({
  whatToDo: { type: String, required: true },
  address: String,
  author: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const Idea = mongoose.model("Idea", ideaSchema);

module.exports = Idea;
