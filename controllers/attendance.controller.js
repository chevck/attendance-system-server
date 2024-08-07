const userModel = require("../models/users.model");
const attendanceModel = require("../models/attendance.model");
const { validateEmail } = require("../utils/functions");
const moment = require("moment");

module.exports = {
  signAttendance: async (req, res) => {
    console.log("got here", req.body);
    const { email } = req.body;
    const isValid = validateEmail(email);
    if (!isValid) return res.status(400).send("Invalid Email Format");
    console.log("got hereees");
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
};
