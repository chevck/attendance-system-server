const adminModel = require("../models/admins.model");

function verifySeargentCode() {
  return async (req, res, next) => {
    const seargentcode = req.headers.seargentcode;
    if (!seargentcode)
      return res.status(404).send({ message: "Invalid Seargent Code" });
    const adminUser = await adminModel.findOne({ seargentcode });
    if (!adminUser)
      return res.status(404).send({ message: "Invalid Seargent Code" });
    return next();
  };
}

module.exports = verifySeargentCode;
