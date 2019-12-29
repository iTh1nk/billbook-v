const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    index: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  group: {
    type: String,
    required: true,
    default: "Guest"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  activity: [
    {
      type: Schema.Types.ObjectId,
      ref: "Activity"
    }
  ],
  statement: [
    {
      type: Schema.Types.ObjectId,
      ref: "Statement"
    }
  ]
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
