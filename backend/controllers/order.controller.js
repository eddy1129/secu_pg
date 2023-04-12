const models = require("../models");
const Order = models.order;

exports.create = async (req, res) => {
  if (!req.body.userId) {
    res.status(400).send({
      message: "The request is empty.",
    });
    return;
  }

  const order = {
    userId: req.body.userId,
    date: req.body.date,
    status: req.body.status,
    address: req.body.address,
    total: req.body.total,
  };

  try {
    const data = await Order.create(order);
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
    const num = await Order.destroy({
      where: { id: id },
    });

    if (num == 1) {
      res.send({
        message: "Order was deleted successfully!",
      });
    } else {
      res.send({
        message: `Cannot delete Order with id=${id}. Maybe Order was not found!`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Could not delete Order with id=" + id,
    });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;

  try {
    const num = await Order.update(req.body, {
      where: { id: id },
    });

    if (num == 1) {
      res.send({
        message: "Order was updated successfully.",
      });
    } else {
      res.send({
        message: `Cannot update Order with id=${id}. Maybe Order was not found or req.body is empty!`,
      });
    }

  } catch (err) {
    res.status(500).send({
      message: "Error updating Order with id=" + id,
    });
  }
};

exports.findAll = async (req, res) => {
  try {
    const data = await Order.findAll();
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error retrieving Orders.",
    });
  }
};

exports.findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Order.findByPk(id);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving Order with id=" + id,
    });
  }
}

exports.findAllByUserId = async (req, res) => {
  const userId = req.params.userId;

  try {
    const data = await Order.findAll({ where: { userId: userId } });
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving Order with userId=" + userId,
    });
  }
}