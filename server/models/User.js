const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  names: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  role: { type: String, required: true },
  title: { type: String, required: true },
  about: { type: String },
  profile: {
    image: { type: String },
    address: { type: String },
    interests: { type: [String] },
    age: { type: Number },
    country: { type: String },
    educationLevel: { type: String },
    skills: { type: [String] },
  },
  experience: {
    position: { type: String },
    field: { type: String },
    company: { type: String },
    duration: {
      start: { type: String },
      end: { type: String },
    },
    description: { type: String },
  },
  engagementStats: {
    pointsEarned: { type: Number },
    badges: { type: [String] },
    completedChallenges: { type: Number },
    feedbackReceived: { type: [Object] },
  },
  umuravaIntegration: {
    umuravaUserId: { type: String },
    linkedAccounts: {
      github: { type: String },
      linkedin: { type: String },
    },
  },
  audit: {
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  communityJoined: [{ type: mongoose.Schema.Types.ObjectId, ref: "Community" }],
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
