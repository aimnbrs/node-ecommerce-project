const express = require("express");
const router = express.Router();
const Product = require("./../DB/model/productModel");
const mongoose = require("mongoose");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./upload/");
  },
  filename: (req, file, callback) => {
    callback(null,`${new Date().toDateString()  + file.originalname}`.replace(/\s/g, '_')  );
  },
});

const mimFilter = (req, file, callback) => {
  if (file.mimetype === "image/jpeg" || "image/png" || "image/jpg") {
    callback(null,true)
  } else {
    callback(null,false)
  }
}
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: mimFilter,
});

router.post("/", upload.single("file"), async (req, res) => {
  console.log("color",req.body.color);
  console.log("style",req.body.style);
  console.log("file",req.file);
  try {
    const newProduct = new Product({
      _id: new mongoose.Types.ObjectId(),
      category: req.body.category,
      model: req.body.model,
      price: req.body.price,
      url: "http://localhost:5000/" +  req.file.path,
      color: req.body.color,
      status: req.body.status,
      style: req.body.style,
    });

    const newProductCreat = await newProduct.save();
    res.status(201).send(newProductCreat);
  } catch (err) {
    console.log(err.message);
    res.status(201).send(`Error :${err.message}`);
  }
});

router.get("/", async (req, res) => {
  try {
    console.log(req.query);
    const color = req.query.color ? { color: req.query.color } : {};
    const style = req.query.style ? { style: req.query.style } : {};
    const status = req.query.status ? { status: req.query.status } : {};
    const price = req.query.price
      ? { price: { $gte: req.query.price[0], $lte: req.query.price[1] } }
      : {};
    console.log(color);
    const model = req.query.model
      ? {
          model: {
            $regex: req.query.model,
            $options: "i",
          },
        }
      : {};
    const category = req.query.category ? { category: req.query.category } : {};
    const sortPrice = req.query.sortPrice
      ? req.query.sortPrice === "dec"
        ? { price: -1 }
        : { price: 1 }
      : {};
    console.log(sortPrice);

    const products = await Product.find({
      ...color,
      ...style,
      ...status,
      ...price,
      ...category,
      ...model,
    }).sort({ ...sortPrice });
    res.status(201).send(products);
  } catch (err) {
    res.status(201).send(`Error :${err.message}`);
    console.log(err.message);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const products = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: false,
    });
    res.status(201).send(products);
  } catch (err) {
    res.status(201).send(`Error :${err.message}`);
    console.log(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const products = await Product.findByIdAndDelete(req.params.id, {
      useFindAndModify: false,
    });
    res.status(201).send(products);
  } catch (err) {
    res.status(201).send(`Error :${err.message}`);
    res.send(err);
  }
});

module.exports = router;
