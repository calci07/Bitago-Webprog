const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, lowercase: true, trim: true },
    title: { type: String, required: true, trim: true },
    summary: { type: String, required: true, trim: true },
    body: [{ type: String, required: true, trim: true }],
    takeaways: [{ type: String, required: true, trim: true }],
    isAvailable: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model('Article', articleSchema)
