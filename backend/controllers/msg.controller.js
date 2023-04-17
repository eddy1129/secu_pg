const models = require("../models");
const AES = require("../util/aseUtil");
const RSA = require("../util/rsaUtil");
const Msg = models.msg;

exports.create = async (req, res) => {
  if (
    !req.body.message
  ) {
    res.status(400).send({
      message: "The request is empty.",
    });
    return;
  }

  const data = req.body.message;

  const key = RSA.rsaDecrypt(data.key);
  const vi = RSA.rsaDecrypt(data.sign);

  const content = JSON.parse(AES.aseDecrypt(data.content, key, vi));

  const msg = {
    room: content.room,
    username: content.username,
    usermsg: content.usermsg,
    time: content.time,
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
    const dataJson = JSON.stringify(data);
    const msg = AES.doEncrypt(dataJson);

    res.send(msg);

  } catch (err) {
    res.status(500).send({
      message: err.message || "Error",
    });
  }
};
