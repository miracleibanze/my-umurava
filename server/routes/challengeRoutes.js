const express = require("express");
const {
  createChallenge,
  getChallenges,
  getChallengeById,
  updateChallenge,
  deleteChallenge,
} = require("../controllers/challengeControllers");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

// Public route to get challenges
router.get("/", getChallenges);

// Public route to get a single challenge by ID
router.get("/:id", getChallengeById);

// Protected route to create a new challenge (Admin only)
router.post("/", authMiddleware, adminMiddleware, createChallenge);

// Protected route to update a challenge (Admin only)
router.put("/:id", authMiddleware, adminMiddleware, updateChallenge);

// Protected route to delete a challenge (Admin only)
router.delete("/:id", authMiddleware, adminMiddleware, deleteChallenge);

module.exports = router;
