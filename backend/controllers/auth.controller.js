const jwt = require("jsonwebtoken");
const saltedMd5 = require('salted-md5');
const JWT_SECRET = process.env.JWT_SECRET;
const MD5_SALT = process.env.MD5_SALT;
const Mail = require("../util/mailUtil");
const GENERATOR_CODE = require('../util/GeneratorVerifyCodeUtil');
const models = require("../models");
const User = models.user;
const Code = models.code;

// Login
exports.login = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).send({
      message: "The request is empty.",
    });
    return;
  }

  const user = {
    email: req.body.email,
    password: saltedMd5(req.body.password, MD5_SALT),
  };

  const data = await User.findOne({ where: { email: user.email } });
  if (!data) {
    return res.status(404).send({ message: "User Not found." });
  }
  if (data.password == user.password) {
    var token = jwt.sign({ id: data.id }, JWT_SECRET, {
      expiresIn: 86400, // expires in 24 hours
    });
    res.status(200).send({
      token: token,
      username: data.username,
      userId: data.id,
      message: "User was logged in successfully!",
    });
    const verifyCode = GENERATOR_CODE.verifyCode();
    Mail.send(user.email,verifyCode)
        .then(async () => {
          console.log("Login Verify Code send to " + user.email + " Success");
          // clear the old verify code to confirm the verify code is latest or unique
          await Code.destroy({where: {email: user.email}});
          // create a new verify code
          await Code.create({email: user.email, code: verifyCode});
          setTimeout(async () => {
            await Code.destroy({where: {email: user.email}});
          },1000*60*5); // wait for 5 minutes, and then delete the verify code
        })
        .catch(() => {
          console.log("Login Verify Code send to " + user.email + " Failed");
        });
  } else {
    res.status(401).send({ message: "Invalid Password!" });
  }
};

// Logout
exports.logout = (req, res) => {
  res.status(200).send({ token: null });
};
