const adminModel = require("../models/admins.model");
const { validateEmail } = require("../utils/functions");

module.exports = {
  create: async (req, res) => {
    const isValid = validateEmail(req.body.email);
    if (!isValid) return res.status(400).send("Invalid Email Format");
    try {
      let user = new adminModel(req.body);
      user = await user.save();
      return res.status(201).json({ ...user._doc });
    } catch (error) {
      return res.status(500).json({
        message: "Cannot create this email at the moment. Please try again",
        error,
      });
    }
  },
};
