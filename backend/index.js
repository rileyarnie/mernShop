const express = require("express");
const mongoose = require("mongoose");
const createError = require("http-errors");
const cors = require("cors");

require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;
const productRoutes = require("./routes/products");
const authRoutes = require("./routes/auth");

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use("/products", productRoutes);
app.use("/auth", authRoutes);

app.use(async (req, res, next) => {
  next(createError.NotFound());
});
app.use((error, req, res, next) => {
  const status = error.status || 500;
  res.status(status).json({ error: error.message });
});

mongoose
  .connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((res) => {
    app.listen(PORT, () => {
      console.log(`server running on http://localhost:${PORT}`);
    });
    console.log("Connected to database successfully");
  })
  .catch((err) => console.log(err));
