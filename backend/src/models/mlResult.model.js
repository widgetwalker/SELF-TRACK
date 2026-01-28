const mongoose = require("mongoose");

const mlResultSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // what ML this result belongs to
    type: {
      type: String,
      enum: ["productivity", "burnout", "anomaly"],
      required: true
    },

    // ML output (flexible for future models)
    result: {
      type: Object,
      required: true
    },

    // optional confidence score
    confidence: {
      type: Number,
      default: null
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("MLResult", mlResultSchema);

