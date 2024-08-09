const express = require("express");
const adminController = require("../controllers/admin.controller");
const router = express.Router();

router.post("/create", adminController.create);

router.get("/verify", adminController.verifyAdmin);

module.exports = router;
