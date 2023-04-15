const express = require("express");
const router = express.Router();

const auth = require("../controllers/auth.controller.js");

router.post("/login", auth.login);

router.post("/logout", auth.logout);
router.post("/sendemail", auth.sendEmail);

module.exports = router;
