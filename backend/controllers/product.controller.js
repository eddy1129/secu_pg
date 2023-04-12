const models = require("../models");
const Product = models.product;

// Create a new product
exports.create = async (req, res) => {
  if (
    !req.body.name ||
    !req.body.author ||
    !req.body.price ||
    !req.body.image
  ) {
    res.status(400).send({
      message: "The request is empty.",
    });
    return;
  }

  const product = {
    name: req.body.name,
    author: req.body.author,
    price: req.body.price,
    image: req.body.image,
  };

  try {
    const data = await Product.create(product);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error",
    });
  }
};

// Create multiple products
exports.bulkCreate = async (req, res) => {
  if (!req.body.products) {
    res.status(400).send({
      message: "The request is empty.",
    });
    return;
  }

  try {
    const data = await Product.bulkCreate(req.body.products);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error",
    });
  }
}

// Delete a product with the id
exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    const num = await Product.destroy({
      where: { id: id },
    });

    if (num == 1) {
      res.send({
        message: "Product was deleted successfully!",
      });
    } else {
      res.send({
        message: `Cannot delete product with id=${id}. Maybe product was not found!`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Could not delete product with id=" + id,
    });
  }
};

// Update a product info with the id
exports.update = async (req, res) => {
  const id = req.params.id;

  try {
    const num = await Product.update(req.body, {
      where: { id: id },
    });

    if (num == 1) {
      res.send({
        message: "Product was updated successfully.",
      });
    } else {
      res.send({
        message: `Cannot update product with id=${id}. Maybe product was not found or req.body is empty!`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error updating product with id=" + id,
    });
  }
};

// Retrieve all the product data
exports.findAll = async (req, res) => {
  try {
    const data = await Product.findAll();
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error",
    });
  }
};

// Get info of one product with the id
exports.findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Product.findByPk(id);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving product with id=" + id,
    });
  }
};