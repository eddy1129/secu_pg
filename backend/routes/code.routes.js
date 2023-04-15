const express = require("express");
const router = express.Router();

const code = require("../controllers/code.controller.js");

router.post("/", code.create);

router.delete("/:email", code.delete);

router.put("/:email", code.update);

router.get("/", code.findAll);

router.get("/:email", code.findOne);

router.post("/verify", code.verify);

module.exports = router;