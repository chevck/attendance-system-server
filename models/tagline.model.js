const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaglineSchema = new Schema({
  mainText: { type: String, required: true },
  supportingText: { type: String, required: true },
  createdon: { type: Date, default: new Date() },
});

module.exports = mongoose.model("taglines", TaglineSchema);
