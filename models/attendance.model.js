const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AttendanceSchema = new Schema({
  email: { type: String },
  signedIn: { type: Date, default: new Date() },
});

module.exports = mongoose.model("attendanceList", AttendanceSchema);
