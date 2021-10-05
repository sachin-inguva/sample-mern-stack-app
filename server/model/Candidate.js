const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  challengesSolved: { type: Number, default: 0 },
  expertiseLevel: { type: Number, default: 0 },
  votes: { type: Number, default: 0 },
  expertIn: {
    type: Array,
    of: String,
    default: [],
  },
});

const Candidate = mongoose.model("Candidate", candidateSchema);

exports.Candidate = Candidate;
