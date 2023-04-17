const express = require("express");
const router = express.Router();

const paymentRecords = require("../controllers/paymentRecord.controller.js");

router.post("/", paymentRecords.create);
router.get("/", paymentRecords.findAll);

module.exports = router;
