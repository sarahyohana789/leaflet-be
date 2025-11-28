const mongoose = require("mongoose");

const cafeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    rating: { type: Number, min: 1, max: 5 },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cafe", cafeSchema);
