const mongoose = require("mongoose");
require("dotenv").config();
// const cloudinary = require("cloudinary");

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected Sucessfully");
  })
  .catch((err) => {
    console.log(err);
    console.log(process.env.MONGO_URL);
  });

// cloudinary.v2.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });
