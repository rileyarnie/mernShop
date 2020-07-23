const axios = require("axios").default;
const createError = require("http-errors");

module.exports = (req, res, next) => {
  const consumer_key = process.env.CONSUMER_KEY;
  const consumer_secret = process.env.CONSUMER_SECRET;
  const auth =
    "Basic " +
    new Buffer.from(consumer_key + ":" + consumer_secret).toString("base64");
  axios({
    method: "GET",
    url:
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
    headers: {
      Authorization: auth,
    },
  })
    .then((response) => {
      const { access_token, expires_in } = response.data;
      req.access_token = access_token;
      console.log(access_token);
      next();
    })
    .catch((err) => {
      console.log(err);
      next(createError.InternalServerError("something went wrong"));
    });
};
