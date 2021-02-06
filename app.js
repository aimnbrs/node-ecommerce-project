const express = require('express');
const app = express();
const productRouter = require('./routes/productRoute') ;
const orderRouter = require('./routes/orderRoute') ;
const userRouter = require('./routes/userRoute') ;
const mongoose = require('mongoose');
const bodyParse = require('body-parser');



const URL = 'mongodb+srv://aimnbrs:f6KRTND6Qg7kgyWw@cluster0.5dsrb.mongodb.net/ecommarce_data?retryWrites=true&w=majority'


mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }).catch((error) => console.log("connection problem",error.reason));


app.use(bodyParse.urlencoded({extended : false}));
app.use(bodyParse.json());
app.use("/upload", express.static("upload"));
app.use("/product", productRouter);
app.use("/order", orderRouter);
app.use("/user", userRouter);

  

module.exports = app;