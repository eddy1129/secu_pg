const jwt = require("jsonwebtoken");
const saltedMd5 = require('salted-md5');
const JWT_SECRET = process.env.JWT_SECRET;
const MD5_SALT = process.env.MD5_SALT;
const Mail = require("../util/mailUtil");
const models = require("../models");
const User = models.user;

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
    Mail.send(user.email)
        .then(() => {
          console.log("Login Verify Code send to " + user.email + " Success");
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
