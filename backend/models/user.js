const mongoose = require("mongoose");
const { type } = require("../validation/user");
const schema = mongoose.Schema;

const userSchema = new schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  orders: [
    {
      type: schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
