const taglineModel = require("../models/tagline.model");

module.exports = {
  create: async (req, res) => {
    const { mainText, supportingText } = req.body;
    if (mainText.length < 7 || supportingText.length < 7)
      return res
        .status(400)
        .send("Your taglines have to be at least 7 characters long");
    try {
      let tag = new taglineModel(req.body);
      tag = await tag.save();
      return res.status(201).json("Saved Successfully");
    } catch (error) {
      return res.status(500).json({
        message: "Cannot create taglines at the moment. Please try again",
        error,
      });
    }
  },

  getLatest: async (req, res) => {
    // get the latest tagline
    try {
      const tagline = await taglineModel.findOne().sort({ createdon: -1 });
      return res.status(200).json(tagline);
    } catch (error) {
      return res.status(500).send({ message: "Error getting tagline", error });
    }
  },
};
