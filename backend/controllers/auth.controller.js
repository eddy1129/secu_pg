const jwt = require("jsonwebtoken");
const saltedMd5 = require("salted-md5");
const JWT_SECRET = process.env.JWT_SECRET;
const MD5_SALT = process.env.MD5_SALT;
const Mail = require("../util/mailUtil");
const RSA = require("../util/rsaUtil.js");
const AES = require("../util/aseUtil.js");
const models = require("../models");
const User = models.user;
const Code = models.code;

// Login
exports.login = async (req, res) => {
  if (!req.body.user || !req.body.pair) {
    res.status(400).send({
      message: "The request is empty.",
    });
    return;
  }

  const key = RSA.rsaDecrypt(req.body.pair.key);
  const iv = RSA.rsaDecrypt(req.body.pair.iv);

  const temp = JSON.parse(AES.aseDecrypt(req.body.user, key, iv));

  const user = {
    email: temp.email,
    password: saltedMd5(temp.password, MD5_SALT),
  };

  const data = await User.findOne({ where: { email: user.email } });
  if (!data) {
    return res.status(404).send({ message: "User Not found." });
  }
  if (data.password == user.password) {
    var token = jwt.sign({ id: data.id }, JWT_SECRET, {
      expiresIn: 36000, // expires in 30 min
    });
    res.status(200).send({
      token: token,
      username: data.username,
      userId: data.id,
      message: "User was logged in successfully!",
    });
    console.log("============email============", user.email);
    Mail.sendVerifyMail(user.email);
  } else {
    res.status(401).send({ message: "Invalid Password!" });
  }
};

// Logout
exports.logout = (req, res) => {
  res.status(200).send({ token: null });
};

exports.sendEmail = async (req, res) => {
  if (!req.body.user || !req.body.pair) {
    res.status(400).send({
      message: "The request is empty.",
    });
    return;
  }

  const key = RSA.rsaDecrypt(req.body.pair.key);
  const iv = RSA.rsaDecrypt(req.body.pair.iv);

  const temp = JSON.parse(AES.aseDecrypt(req.body.user, key, iv));

  const user = {
    email: temp.email,
    password: saltedMd5(temp.password, MD5_SALT),
  };

  const data = await User.findOne({ where: { email: user.email } });
  if (!data) {
    return res.status(404).send({ message: "User Not found." });
  }
  if (data.password == user.password) {
    res.status(200).send({ verCode: Mail.sendVerifyMail(user.email) });
  }
};
