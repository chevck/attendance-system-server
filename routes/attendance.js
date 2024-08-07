const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendance.controller");

router.post("/sign", attendanceController.signAttendance);

module.exports = router;
