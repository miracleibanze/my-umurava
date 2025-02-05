const mongoose = require("mongoose");

const participantsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
});

const challengeSchema = new mongoose.Schema({
  title: { type: String },
  email: { type: String },
  category: { type: String },
  skills: { type: [String] },
  difficulty: { type: String },
  deadline: { type: String },
  description: { type: String },
  duration: { type: String },
  prize: { type: String },
  participants: { type: [participantsSchema] },
  projectRequirements: { type: [String] },
  projectDesign: { type: [String] },
  tasks: { type: [String] },
  tools: { type: [String] },
  brief: { type: String },
  deliverables: { type: [String] },
  status: {
    type: String,
    enum: ["open", "ongoing", "completed"],
    default: "open",
  },
});

module.exports = mongoose.model("Challenge", challengeSchema);
