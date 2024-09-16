const express = require("express");
const taglinesController = require("../controllers/taglines.controller");
const router = express.Router();
const checkAuthorization = require("../middleware/checkAuthorization");

router.post("/create", checkAuthorization(), taglinesController.create);

router.get("/latest", taglinesController.getLatest);

module.exports = router;
