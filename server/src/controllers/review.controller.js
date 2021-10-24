const { default: axios } = require("axios");
var express = require("express");
const Review = require("../models/review.schema");
var router = express.Router();
const { lookup } = require("geoip-lite");

router.post("/", async (req, res) => {
  const productName = req.body.productName;
  const keywords = req.body.keywords;
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  const payload = {
    prompt: `Write a product review based on these notes:nnName: ${productName}, ${keywords}.nnReview:`,
    temperature: 0.3,
    max_tokens: 100,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  };

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  };
  const response = await axios.post(
    "https://api.openai.com/v1/engines/davinci-instruct-beta/completions",
    payload,
    {
      headers: headers,
    }
  );

  const newReview = new Review({
    productName: productName,
    keywords: keywords,
    review: response.data.choices[0].text.trim(),
    ipAddress: ip,
  });

  console.log(ip);
  console.log(lookup(ip));
  
  await newReview.save();

  res.send(response.data);
});
router.get("/", async function (req, res) {});
module.exports = router;
