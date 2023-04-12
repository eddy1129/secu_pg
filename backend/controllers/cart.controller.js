const models = require("../models");
const Cart = models.cart;

exports.create = async (req, res) => {
  if (!req.body.userId) {
    res.status(400).send({
      message: "The request is empty.",
    });
    return;
  }

  const cart = {
    userId: req.body.userId,
    productId: req.body.productId,
    orderId: req.body.orderId,
  };

  try {
    const data = await Cart.create(cart);
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
    const num = await Cart.destroy({
      where: { id: id },
    });

    if (num == 1) {
      res.send({
        message: "Cart was deleted successfully!",
      });
    } else {
      res.send({
        message: `Cannot delete Cart with id=${id}. Maybe Cart was not found!`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Could not delete Cart with id=" + id,
    });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;

  try {
    const num = await Cart.update(req.body, {
      where: { id: id },
    });

    if (num == 1) {
      res.send({
        message: "Cart was updated successfully.",
      });
    } else {
      res.send({
        message: `Cannot update Cart with id=${id}. Maybe Cart was not found or req.body is empty!`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error updating Cart with id=" + id,
    });
  }
};

exports.findAll = async (req, res) => {
  try {
    const data = await Cart.findAll();
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error",
    });
  }
};

exports.findAllByUserId = async (req, res) => {
  const userId = req.params.userId;

  try {
    const data = await Cart.findAll({
      where: { userId: userId },
    });
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving Cart with userId=" + userId,
    });
  }
};

exports.findAllByProductId = async (req, res) => {
  const productId = req.params.productId;

  try {
    const data = await Cart.findAll({
      where: { productId: productId },
    });
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving Cart with productId=" + productId,
    });
  }
};

exports.findOneByUserIdAndProductId = async (req, res) => {
  const userId = req.params.userId;
  const productId = req.params.productId;

  try {
    const data = await Cart.findOne({
      where: { userId: userId, productId: productId },
    });
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message:
        "Error retrieving Cart with userId=" +
        userId +
        " and productId=" +
        productId,
    });
  }
};