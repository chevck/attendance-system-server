const userModel = require("../models/users.model");
const { validateEmail } = require("../utils/functions");

module.exports = {
  create: async (req, res) => {
    const { emails } = req.body;
    const invalidEmails = emails.reduce((acc, curr) => {
      if (!validateEmail(curr)) {
        return [...acc, curr];
      }
      return acc;
    }, []);
    if (invalidEmails.length)
      return res.status(400).send("You have an invalid mail in your list");
    try {
      const emailsToSave = emails.map((email) => ({ email }));
      const doEmailsExistInDB = await userModel.find({
        email: { $in: emails },
      });
      if (doEmailsExistInDB.length) {
        const dupEmails = doEmailsExistInDB.map((el) => el.email);
        const duplicates = dupEmails.join(",");
        return res
          .status(500)
          .send(`We already have this email in the db: ${duplicates}`);
      }
      const result = await userModel.insertMany(
        emails.map((el) => ({ email: el }))
      );
      return res.status(201).json("Saved successfully");
    } catch (error) {
      return res.status(500).json({
        message: "Cannot create this email at the moment. Please try again",
        error,
      });
    }
  },
};
