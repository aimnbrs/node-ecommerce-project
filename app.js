const express = require("express");
const app = express();
const productRouter = require("./routes/productRoute");
const orderRouter = require("./routes/orderRoute");
const userRouter = require("./routes/userRoute");
const blogsRouter = require("./routes/blogsRoute");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const URL = process.env.MONGODB_URL;

mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .catch((error) => console.log("connection problem", error.reason));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/upload", express.static("upload"));
app.use("/product", productRouter);
app.use("/order", orderRouter);
app.use("/user", userRouter);
app.use("/blogs", blogsRouter);

module.exports = app;
