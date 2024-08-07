const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
  email: { type: String, unique: true },
  createdon: { type: Date, default: new Date() },
});

module.exports = mongoose.model("admins", AdminSchema);
