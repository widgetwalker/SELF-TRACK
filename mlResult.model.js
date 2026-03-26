const mongoose = require('mongoose');

const mlResultSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    productivityScore: Number,
    source: {
      type: String,
      default: 'ml'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('MLResult', mlResultSchema);
