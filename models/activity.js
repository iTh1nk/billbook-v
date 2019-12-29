const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ActivitySchema = new Schema ({
  username: {
    type: String,
    required: true
  },
  deposit: {
    type: String,
    required: true,
    default: 0
  },
  totalBalance: {
    type: String,
    required: true,
    default: 0
  },
  approval: {
    type: String,
    required: true,
    default: "Pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  updatedAt0: {
    type: Date,
    default: Date.now
  }
})

const Activity = mongoose.model("Activity", ActivitySchema);
module.exports = Activity;