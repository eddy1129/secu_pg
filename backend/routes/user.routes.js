const express = require("express");
const router = require("express").Router();

const users = require("../controllers/user.controller.js");

router.post("/", users.create);

router.put("/:id", users.update);

router.delete("/:id", users.delete);

router.get("/", users.findAll);

router.get("/:id", users.findOne);

router.get("/username/:username", users.findOneByUsername);

module.exports = router;
