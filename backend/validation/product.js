const Joi = require("@hapi/joi");

const productSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  category: Joi.string().required(),
  price: Joi.number().required(),
});

module.exports = { productSchema };
