const Joi = require("@hapi/joi");

const userRegistrationSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().required().email(),
  password: Joi.string().required().min(6),
});

module.exports = userRegistrationSchema;
