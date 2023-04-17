const express = require("express");
const router = express.Router();
const RSA = require("../api/rsa.js");
const AES = require("../api/ase.js");

router.get("/getPublicKey", RSA.getPublicKey);
router.get("/getAESPair", AES.getAESPair);

module.exports = router;