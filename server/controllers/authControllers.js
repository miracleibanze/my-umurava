const User = require("../models/User");
const { generateToken } = require("../utils/jwt");

const register = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    const token = generateToken(newUser._id);
    const { password, ...userWithoutPassword } = newUser.toObject();
    res.status(201).json({ token, user: userWithoutPassword });
  } catch (err) {
    res.json({ message: err, data: req.body });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.json({ message: "Invalid credentials" });
    }
    const token = generateToken(user._id);

    // Destructuring to remove password before sending response
    const { password: userPassword, ...userWithoutPassword } = user.toObject();

    res.json({ token, user: userWithoutPassword });
  } catch (err) {
    res.json({ message: err.message });
  }
};

module.exports = { register, login };
