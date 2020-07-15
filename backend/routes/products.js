const express = require("express");
const multer = require("multer");
const createError = require("http-errors");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/png" || "image/jpeg") {
    cb(null, true);
  } else {
    cb(createError.BadRequest("Chosen filetype not allowed"), false);
  }
};

const upload = multer({
  storage,
  limits: { fieldSize: 1024 * 1024 * 3 },
  fileFilter,
});

const router = express.Router();
const productControllers = require("../controllers/products");
const { BadRequest } = require("http-errors");

router.get("", productControllers.getProducts);
router.post(
  "/new-product",
  upload.single("productImage"),
  productControllers.createProduct
);

module.exports = router;
