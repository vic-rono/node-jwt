const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);
  const emailExists = await User.findOne({ email: email });
  if (emailExists) return res.status(400).json("Email already exists");
  const user = new User({
    name: name,
    email: email,
    password: hashedPassword,
  });
  try {
    const newUser = await user._id.save();
    res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json("Email not Found");

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) return res.status(400).json("Invalid password");

    const token = jwt.sign({ _id: user._id }, process.env.SECRET_TOKEN, { expiresIn: process.env.JWT_EXPIRES_IN});
    res.header("auth-token", token).send(token);
  } catch (err) {
    res.status(500).json(err);
  }
};
