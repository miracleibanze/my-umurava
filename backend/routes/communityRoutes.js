const express = require("express");
const {
  createCommunity,
  getCommunities,
} = require("../controllers/communityControllers");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

router.post("/", authMiddleware, adminMiddleware, createCommunity);
router.get("/", getCommunities);

module.exports = router;
