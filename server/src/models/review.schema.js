const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = new Schema({
  productName: String, // String is shorthand for {type: String}
  keywords: String,
  review: String,
  ipAddress: String,
  date: { type: Date, default: Date.now },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
