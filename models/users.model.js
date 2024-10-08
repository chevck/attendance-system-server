const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  createdon: { type: Date, default: new Date() },
});

module.exports = mongoose.model("users", UserSchema);
