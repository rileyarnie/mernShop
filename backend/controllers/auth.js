const bcrypt = require("bcryptjs");
const userRegistrationSchema = require("../validation/user");
const createError = require("http-errors");

const User = require("../models/user");

exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    const result = await userRegistrationSchema.validateAsync(req.body);
    const emailExists = await User.findOne({ email });
    const usernameExists = await User.findOne({ username });
    if (emailExists) {
      throw createError.Conflict("User with that email already exists");
    }

    if (usernameExists) {
      throw createError.Conflict("username already taken");
    }

    const savedUser = await user.save();
    res
      .status(201)
      .json({ username: savedUser.username, email: savedUser.email });
  } catch (error) {
    error.isJoi ? (error.status = 400) : "";
    return next(error);
  }
};
exports.login = (req, res, next) => {
  res.json({ user: "login here" });
};
exports.logout = (req, res, next) => {
  res.json({ user: "logout here" });
};
