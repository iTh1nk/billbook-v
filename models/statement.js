const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StatementSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  cycle: {
    type: String,
    required: true
  },
  currentBalance: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    required: true,
    default: "NA"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Statement = mongoose.model("Statement", StatementSchema);
module.exports = Statement;