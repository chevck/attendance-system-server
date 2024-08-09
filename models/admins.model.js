const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
  email: { type: String, unique: true },
  createdon: { type: Date, default: new Date() },
  seargentcode: { type: String, unique: true, required: true },
  name: { type: String },
});

module.exports = mongoose.model("admins", AdminSchema);
