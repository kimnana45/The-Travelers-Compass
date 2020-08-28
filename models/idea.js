const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ideaSchema = new Schema({
  idea: { type: String, required: true },
  author: { type: String, required: true },
  address: String,
  date: { type: Date, default: Date.now }
});

const Idea = mongoose.model("Idea", ideaSchema);

module.exports = Idea;
