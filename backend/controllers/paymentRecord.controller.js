const models = require("../models");
const PaymentRecord = models.paymentRecord;

exports.create = async (req, res) => {
  if (!req.body.name || !req.body.price || !req.body.date) {
    res.status(400).send({
      message: "The request is empty.",
    });
    return;
  }

  const paymentRecord = {
    name: req.body.name,
    price: req.body.price,
    date: req.body.date,
  };

  try {
    const data = await PaymentRecord.create(paymentRecord);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error",
    });
  }
};

exports.findAll = async (req, res) => {
  try {
    const data = await PaymentRecord.findAll();
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error",
    });
  }
};
