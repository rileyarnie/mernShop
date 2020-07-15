const mongoose = require("mongoose");
const schema = mongoose.Schema;

productSchema = new schema({
  name: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  category: {
    required: true,
    type: String,
  },
  price: {
    required: true,
    type: Number,
  },
  productImage: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
