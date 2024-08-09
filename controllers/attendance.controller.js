const userModel = require("../models/users.model");
const attendanceModel = require("../models/attendance.model");
const { validateEmail } = require("../utils/functions");
const moment = require("moment");
const xlsx = require("xlsx");
const fse = require("fs-extra");
const fs = require("fs");
const path = require("path");

module.exports = {
  signAttendance: async (req, res) => {
    const { email } = req.body;
    const isValid = validateEmail(email);
    if (!isValid) return res.status(400).send("Invalid Email Format");
    try {
      const doesEmailExist = await userModel.findOne({ email });
      if (!doesEmailExist)
        return res.status(404).send("This is not a CCW member");
      const hasUserRegisteredToday = await attendanceModel.findOne({
        email,
        signedIn: {
          $gte: moment().startOf("day"),
          $lte: moment().endOf("day"),
        },
      });
      if (hasUserRegisteredToday)
        return res
          .status(400)
          .send("You have marked your attendance today, Go in peace!");
      let user = new attendanceModel(req.body);
      user = await user.save();
      return res.status(201).json({ ...user._doc });
    } catch (error) {
      return res.status(500).json({
        message: "Cannot sign for this user at the moment. Please try again",
        error,
      });
    }
  },

  getAttendees: async (req, res) => {
    try {
      const { filterDate } = req.query;
      const data = await attendanceModel.find({
        signedIn: {
          $gte: moment(filterDate).startOf("day").toDate(),
          $lt: moment(filterDate).endOf("day").toDate(),
        },
      });
      return res.status(200).send(data);
    } catch (error) {
      return res.status(500).json({
        message: "Error getting attendees for selected query",
        error,
      });
    }
  },

  downloadAttendees: async (req, res) => {
    try {
      const { filterDate } = req.query;
      const data = await attendanceModel.find({
        signedIn: {
          $gte: moment(filterDate).startOf("day").toDate(),
          $lt: moment(filterDate).endOf("day").toDate(),
        },
      });
      const rows = data.map((el) => ({
        Name: el.name,
        Email: el.email,
        "Signed In by": moment(el.signedIn).format("hh:mm a"),
      }));
      const sheet = xlsx.utils.json_to_sheet(rows);
      const workbook = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(workbook, sheet, "Attendance");
      // adjust column width
      sheet["!cols"] = [{ wch: 20, wch: 30, wch: 20 }];
      const filename = `CCW_Ibadan_attendance_${moment(filterDate).format(
        "Do-MMM-YYYY"
      )}.xlsx`;
      const filePath = path.join(__dirname, "../temp", filename);
      xlsx.writeFile(workbook, filePath);
      res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
      res.writeHead(200, {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      fs.createReadStream(filePath)
        .pipe(res)
        .on("finish", async () => {
          await fse.unlink(filePath);
        });
      // res.status(200).json("Downloaded filee");
    } catch (error) {
      res.status(500).send({
        message: "Error downloading attendees matching your specified filter",
        error,
      });
    }
  },
};
