const express = require("express");
const router = express.Router();

const carts = require("../controllers/cart.controller.js");

router.post("/", carts.create);

router.put("/:id", carts.update);

router.delete("/:id", carts.delete);

router.get("/", carts.findAll);

router.get("/user/:userId", carts.findAllByUserId);

router.get("/user/:userId/:productId", carts.findOneByUserIdAndProductId);

module.exports = router;