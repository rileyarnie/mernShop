const axios = require("axios");

exports.lipaNaMpesa = (req, res, next) => {
  const Timestamp = new Date()
    .toISOString()
    .replace(/[^0-9]/g, "")
    .slice(0, -3);

  const Password = new Buffer.from(
    `${process.env.LIPA_NA_MPESA_SHORT_CODE}${process.env.MPESA_PASSKEY}${Timestamp}`
  ).toString("base64");


  axios({
    url: "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
    method: "POST",
    headers: {
      Authorization: `Bearer ${req.access_token}`,
    },
    data: {
      BusinessShortCode: process.env.LIPA_NA_MPESA_SHORT_CODE,
      Password,
      Timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: 1,
      PartyA: "254708374149",
      PartyB: process.env.LIPA_NA_MPESA_SHORT_CODE,
      PhoneNumber: req.body.phoneNumber,
      CallBackURL: `${process.env.BASE_URL}/mpesa/checkout`,
      AccountReference: "iSuperStore",
      TransactionDesc: "Test Lipa na Mpesa",
    },
  })
    .then((response) => console.log(response.data))
    .catch((err) => console.log(err));

  res.status(200).json({ message: "Request successful" });
};

exports.mpesaCheckout = (req, res, next) => {
  console.log("*************CHECKOUT************");
  console.log(req.body);
};
