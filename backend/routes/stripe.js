const express = require("express")
const router = express.Router()
const controllers = require ("../controllers/stripe")

router.post("/create-payment-intent", controllers.chargeCard)

module.exports = router