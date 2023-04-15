const express = require("express");
const router = express.Router();
const RSA = require("../api/rsa.js");

router.get("/getPublicKey", RSA.getPublicKey);

module.exports = router;