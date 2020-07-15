const { productSchema } = require("../validation/product");
const Product = require("../models/product");
const createError = require("http-errors");

exports.getProducts = async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({ products });
};

exports.createProduct = async (req, res, next) => {
  const { name, price, description, category } = req.body;
  const productImage = req.file.path;
  console.log(req.body);

  const product = new Product({
    name,
    price,
    description,
    category,
    productImage,
  });

  try {
    const result = await productSchema.validateAsync(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    error.isJoi ? (error.status = 400) : "";
    next(error);
  }
};
