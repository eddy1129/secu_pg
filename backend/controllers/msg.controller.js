const models = require("../models");
const Msg = models.msg;

exports.create = async (req, res) => {
  if (
    !req.body.room ||
    !req.body.username ||
    !req.body.usermsg ||
    !req.body.time
  ) {
    res.status(400).send({
      message: "The request is empty.",
    });
    return;
  }

  const msg = {
    room: req.body.room,
    username: req.body.username,
    usermsg: req.body.usermsg,
    time: req.body.time,
  };

  try {
    const data = await Msg.create(msg);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error",
    });
  }
};

exports.findAll = async (req, res) => {
  try {
    const data = await Msg.findAll();
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error",
    });
  }
};
