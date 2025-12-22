const mongoose = require('mongoose');

const salarySchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    month: {
      type: String, // e.g. "2025-12"
      required: true
    },
    basic: {
      type: Number,
      required: true
    },
    allowances: {
      type: Number,
      default: 0
    },
    deductions: {
      type: Number,
      default: 0
    },
    netPay: {
      type: Number,
      required: true
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
);

// prevent duplicate salary for same employee & month
salarySchema.index({ employee: 1, month: 1 }, { unique: true });

module.exports = mongoose.model('Salary', salarySchema);
