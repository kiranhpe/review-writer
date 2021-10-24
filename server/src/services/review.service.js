const Review = require("../models/review.schema");
const { default: axios } = require("axios");

const processReview = async (productName, keywords, ip) => {
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

 await newReview.save();

 return response;
};

module.exports = processReview;
