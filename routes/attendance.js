const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendance.controller");

router.post("/sign", attendanceController.signAttendance);

router.get("/get-attendees", attendanceController.getAttendees);

router.get("/download", attendanceController.downloadAttendees);

module.exports = router;
