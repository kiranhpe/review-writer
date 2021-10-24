const mongoose = require("mongoose");

const connectToDB = async () => {
    await mongoose.connect(process.env.DB);
  };


  module.exports= connectToDB;