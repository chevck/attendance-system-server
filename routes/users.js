const express = require("express");
const usersController = require("../controllers/users.controller");
const router = express.Router();

router.post("/create", usersController.create);

router.get("/", usersController.getAll);

router.get("/download", usersController.downloadUsers);

module.exports = router;
