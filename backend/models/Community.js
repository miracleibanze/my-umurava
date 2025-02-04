const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  names: { type: String, required: true },
  image: { type: String },
  title: { type: String },
});

const communitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  visibility: { type: String, required: true },
  members: { type: Number, default: 0 },
  listOfMembers: { type: [memberSchema] },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Community", communitySchema);
