const createError = require("http-errors");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (!req.get("Authorization")) {
    throw createError.Unauthorized();
  }
  const token = req.get("Authorization").split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) {
      const message =
        err.message === "JsonWebTokenError" ? "Unauthorized" : err.message;
      return next(createError.Unauthorized(message));
    }
    req.userId = payload.id;
    req.username = payload.username;
    next();
  });
};
