const express = require('express');
const router = express.Router();

const products = require("../controllers/product.controller.js");

router.post("/", products.create);
 
router.post("/bulk", products.bulkCreate);

router.put("/:id", products.update);

router.delete("/:id", products.delete);

router.get("/", products.findAll);

router.get("/:id", products.findOne);

module.exports = router;