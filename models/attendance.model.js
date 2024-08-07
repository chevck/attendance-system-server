const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AttendanceSchema = new Schema({
  email: { type: String, unique: true },
  signedIn: { type: Date, default: new Date() },
});

module.exports = mongoose.model("attendanceList", AttendanceSchema);
