const models = require("../models");
const saltedMd5 = require('salted-md5');
const MD5_SALT = process.env.MD5_SALT;
const User = models.user;
const RSA = require("../util/rsaUtil.js");
const AES = require("../util/aseUtil.js");

exports.create = async (req, res) => {
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
    username: temp.username,
    email: temp.email,
    password: saltedMd5(temp.password, MD5_SALT),
  };

  try {
    const data = await User.create(user);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error",
    });
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    const num = await User.destroy({
      where: { id: id },
    });

    if (num == 1) {
      res.send({
        message: "User was deleted successfully!",
      });
    } else {
      res.send({
        message: `Cannot delete User with id=${id}. Maybe User was not found!`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Could not delete User with id=" + id,
    });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;

  try {
    req.body.password = saltedMd5(req.body.password, MD5_SALT);
    const num = await User.update(req.body, {
      where: { id: id },
    });

    if (num == 1) {
      res.send({
        message: "User was updated successfully.",
      });
    } else {
      res.send({
        message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
      });
    }
  } catch {
    res.status(500).send({
      message: "Error updating User with id=" + id,
    });
  }
};

exports.findAll = async (req, res) => {
  try {
    const data = await User.findAll();
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error",
    });
  }
};

exports.findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await User.findByPk(id);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving User with id=" + id,
    });
  }
};

exports.findOneByUsername = async (req, res) => {
  const username = req.params.username;

  try {
    const data = await User.findOne({ where: { username: username } });
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving User with username=" + username,
    });
  }
};
