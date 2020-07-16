const bcrypt = require("bcryptjs");
const userRegistrationSchema = require("../validation/user");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");

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
    const access_token = await jwt.sign(
      {
        id: savedUser._id,
        username: savedUser.username,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30m" }
    );
    res.status(201).json({ access_token });
  } catch (error) {
    error.isJoi ? (error.status = 400) : "";
    return next(error);
  }
};
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw createError.BadRequest("Invalid Credentials");
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw createError.BadRequest("Invalid Credentials");
    }

    const access_token = await jwt.sign(
      { id: user._id, username: user.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30m" }
    );
    res.status(200).json({ access_token });
  } catch (error) {
    return next(error);
  }
};
exports.logout = (req, res, next) => {
  res.json({ user: "logout here" });
};
