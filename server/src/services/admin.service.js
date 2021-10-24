const Review = require("../models/review.schema");

const getIps = async () => {
  const ips = await Review.find().distinct("ipAddress");
  return { ips: ips, count:  ips.length };
};

module.exports = { getIps };
