const express = require("express");
const router = express.Router();

const msgs = require("../controllers/msg.controller.js");

router.post("/", msgs.create);
router.get("/", msgs.findAll);

module.exports = router;
