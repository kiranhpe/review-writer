const express = require("express");
const router = express.Router();
const lookMe = require("../middlewares/ipLookup");

const processReview = require("../services/review.service");

router.post("/", lookMe, async (req, res, next) => {
  const productName = req.body.productName;
  const keywords = req.body.keywords;
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  const response = await processReview(productName, keywords, ip)

  res.send(response.data);
});

router.get("/", async function (req, res) {res.send('')});
module.exports = router;
