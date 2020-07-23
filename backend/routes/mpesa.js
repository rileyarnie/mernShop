const express = require("express");
const router = express.Router();
const controllers = require("../controllers/mpesa");

router.post("/stk", controllers.lipaNaMpesa);
router.post("/checkout", controllers.mpesaCheckout);

module.exports = router;
