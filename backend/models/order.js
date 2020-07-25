const mongoose = require("mongoose");

const schema = mongoose.Schema;

const orderSchema = new schema({
  items: {
    type: [],
    required: true,
  },
  orderBy: {
    type: schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Order", orderSchema);
