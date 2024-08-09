const adminModel = require("../models/admins.model");
const { validateEmail } = require("../utils/functions");

module.exports = {
  create: async (req, res) => {
    const isValid = validateEmail(req.body.email);
    if (!isValid) return res.status(400).send("Invalid Email Format");
    if (!req.body.seargentcode)
      return res.status(400).send("Please, give us a unique seargent code");
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

  verifyAdmin: async (req, res) => {
    const { seargentcode } = req.query;
    if (!seargentcode)
      return res.status(400).send("You need to pass in a seargent code");
    try {
      const adminUser = await adminModel.findOne({ seargentcode });
      if (!adminUser)
        return res
          .status(404)
          .send("This is an invalid seargent code. You are not authorized 😒");
      return res.status(200).send("Welcome Seargent 🫡");
    } catch (error) {
      return res.status(500).send({ message: "Error verifying admin", error });
    }
  },
};
