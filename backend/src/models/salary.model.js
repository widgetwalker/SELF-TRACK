const mongoose = require("mongoose");

const salarySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    month: {
      type: String,
      required: true
    },

    basic: Number,
    allowances: Number,
    deductions: Number,
    netPay: Number,

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

// prevent duplicate salary per month per user
salarySchema.index({ user: 1, month: 1 }, { unique: true });

module.exports = mongoose.model("Salary", salarySchema);

