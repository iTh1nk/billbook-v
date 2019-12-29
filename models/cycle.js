const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CycleSchema = new Schema ({
  date: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  statement: [
    {
      type: Schema.Types.ObjectId,
      ref: "Statement"
    }
  ]
})

const Cycle = mongoose.model("Cycle", CycleSchema)
module.exports = Cycle;