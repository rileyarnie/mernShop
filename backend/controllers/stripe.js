const createError = require("http-errors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.chargeCard = async (req, res, next) => {
  try {
    const { price } = req.body;
    const { email, id, username } = req;
    console.log(username);
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: price * 100,
      currency: "usd",
      receipt_email: email,
      customer: id,
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    next(createError.InternalServerError(error));
  }
};
