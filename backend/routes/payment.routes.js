const express = require("express");
const router = express.Router();

const payment = require("../controllers/payment.controller.js");

const verifyToken = require("../middlewares/verifyToken.js");

router.post("/", verifyToken, payment.create);

module.exports = router;