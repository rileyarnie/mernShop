const Order = require("../models/order");
const User = require("../models/user");
const createError = require("http-errors");

exports.createOrder = async (req, res, next) => {
  const { items, totalPrice } = req.body;
  if (!items) {
    throw createError.BadRequest("Please fill items");
  }
  if (!totalPrice) {
    throw createError.BadRequest("Please fill Price");
  }
  const order = new Order({
    items,
    totalPrice,
    orderBy: req.userId,
  });

  try {
    const savedOrder = await order.save();
    if (!savedOrder) {
      throw createError.NotFound("order not saved");
    }

    const user = await User.findById(req.userId);
    if (!user) {
      throw createError.NotFound("User not found");
    }
    user.orders.push(savedOrder);

    const orderedBy = await user.save();
    if (!orderedBy) {
      throw createError.InternalServerError("couldn't save user");
    }
    res.status(201).json(savedOrder);
  } catch (error) {
    return next(error);
  }
};
