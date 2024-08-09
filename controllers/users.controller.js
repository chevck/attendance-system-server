const userModel = require("../models/users.model");
const { validateEmail } = require("../utils/functions");
const xlsx = require("xlsx");
const fse = require("fs-extra");
const fs = require("fs");
const path = require("path");

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

  getAll: async (req, res) => {
    const users = await userModel.find({
      email: { $ne: "johndoae@gmail.com" },
    });
    res.status(200).send(users);
  },

  downloadUsers: async (req, res) => {
    try {
      const data = await userModel.find({
        email: { $ne: "johndoae@gmail.com" },
      });
      const rows = data.map((el) => ({
        Email: el.email.toLowerCase(),
      }));
      sheet["!cols"] = [{ wch: 50 }];
      const sheet = xlsx.utils.json_to_sheet(rows);
      const workbook = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(workbook, sheet, "CCW_Emails");
      const filename = `CCW_Emails.xlsx`;
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
      console.log({ error });
      res.status(500).send({
        message: "Error downloading ccw emails",
        error,
      });
    }
  },
};
