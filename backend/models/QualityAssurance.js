const mongoose = require("mongoose");

const Schema = mongoose.Schema;
//construct of Item Model :fixiation for the redundant data is not neccery due to the data being singleton but not interchangable

const QASessionSchema = new Schema(
  {
    name: { type: String },
    batchNo: { type: String },
    quantity: { type: Number },
    category: { type: String },
    price: { type: Number },
    weight: { type: Number },
    AssignedEmployee: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("QASession", QASessionSchema);
