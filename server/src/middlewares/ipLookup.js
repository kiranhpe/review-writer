const Review = require("../models/review.schema");

const lookMe = async (req, res, next) => {
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  
    const requestCount = await (await Review.find({ ipAddress: ip })).length;
    console.log(requestCount);
  
    if (requestCount < 11) {
      next();
    } else {
      res.status(403).send('Maximum request reached');
    }
  }
module.exports = lookMe;