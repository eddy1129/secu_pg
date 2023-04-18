const models = require("../models");

const Score = models.score;

exports.create = async (req, res) => {
  if (!req.body.stuId || !req.body.stuScore) {
    res.status(400).send({
      message: "The request is empty.",
    });
    return;
  }

  const score = {
    stuId: req.body.stuId,
    stuScore: req.body.stuScore,
  };

  try {
    const data = await Score.create(score);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error",
    });
  }
};

exports.findAll = async (req, res) => {
  try {
    const data = await Score.findAll();
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error",
    });
  }
};
