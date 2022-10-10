const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const itemSchema = new Schema(
  {
    name: { type: String },
    batchNo: { type: String },
    quantity: { type: Number },
    category: { type: String },
    price: { type: Number },
    weight: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", itemSchema);
