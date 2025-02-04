const User = require("../models/User");

const getAllTalents = async (req, res) => {
  try {
    const talents = await User.find({ role: "talent" });
    res.json(talents);
  } catch (err) {
    res.json({ message: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updates = req.body;

    // Basic input validation
    if (!userId) {
      return res.json({ message: "Invalid user ID" });
    }

    // Find the user by ID and update
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updates,
      { new: true, runValidators: true } // Return the updated document and run validators
    );

    if (!updatedUser) {
      return res.json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);

    // Handle validation errors
    if (error.name === "ValidationError") {
      return res.json({ message: "Validation error", errors: error.errors });
    }

    // Handle invalid ObjectId errors
    if (error.name === "CastError") {
      return res.json({ message: "Invalid user ID format" });
    }

    // Generic server error
    res.json({ message: "Error updating user", error: error.message });
  }
};
module.exports = { getAllTalents, updateUser };
