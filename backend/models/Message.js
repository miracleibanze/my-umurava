const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  status: {
    type: String,
    enum: ["idle", "loading", "succeeded", "failed"],
    default: "idle",
  },
  error: { type: String },
  phoneNumber: { type: String },
  institutionName: { type: String },
  institutionType: { type: String },
  collaborationType: { type: String },
  traineeExperienceLevel: { type: String },
  partnershipInterest: { type: String },
  additionalInfo: { type: String },
});

module.exports = mongoose.model("Message", messageSchema);
