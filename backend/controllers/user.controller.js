const models = require("../models");
const User = models.user;

exports.create = async (req, res) => {
  if (!req.body.username || !req.body.email || !req.body.password) {
    res.status(400).send({
      message: "The request is empty.",
    });
    return;
  }

  const user = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
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
