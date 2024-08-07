const userModel = require("../models/users.model");
const attendanceModel = require("../models/attendance.model");
const { validateEmail } = require("../utils/functions");

module.exports = {
  signAttendance: async (req, res) => {
    const isValid = validateEmail(req.body.email);
    if (!isValid) return res.status(400).send("Invalid Email Format");
    try {
      const doesEmailExist = await userModel.findOne({ email });
      console.log({ doesEmailExist });
      if (!doesEmailExist)
        return res
          .status(404)
          .send("This email does not belong to the allowed email list");
      let sign = new attendanceModel(req.body);
      sign = await sign.save();
      return res.status(201).json({ ...sign._doc });
    } catch (error) {
      return res.status(500).json({
        message: "Cannot sign for this user at the moment. Please try again",
        error,
      });
    }
  },
};
