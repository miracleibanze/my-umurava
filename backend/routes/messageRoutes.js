const express = require("express");
const {
  createMessage,
  getMessages,
} = require("../controllers/messageControllers");

const router = express.Router();

router.post("/", createMessage);
router.get("/", getMessages);

module.exports = router;
