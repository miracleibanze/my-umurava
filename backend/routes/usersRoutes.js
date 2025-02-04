const express = require("express");
const {
  getAllTalents,
  updateUser,
} = require("../controllers/usersControllers");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

// Only admins can access this route
router.get("/talents", authMiddleware, adminMiddleware, getAllTalents);
router.put("/users/:id", updateUser);

module.exports = router;
