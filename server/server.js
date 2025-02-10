require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const challengeRoutes = require("./routes/challengeRoutes");
const communityRoutes = require("./routes/communityRoutes");
const messageRoutes = require("./routes/messageRoutes");
const userRoutes = require("./routes/usersRoutes");

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.ORIGIN, // Replace with your frontend's URL in production
    credentials: true, // If you're sending cookies or authorization headers
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/challenges", challengeRoutes);
app.use("/api/communities", communityRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/", userRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
