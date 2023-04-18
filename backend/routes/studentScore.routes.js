const express = require("express");
const router = express.Router();

const scores = require("../controllers/studentScore.controller.js");

router.post("/", scores.create);
router.get("/", scores.findAll);

module.exports = router;
