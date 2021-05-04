const express = require("express");
const { authorized } = require("../middleware");
const router = express.Router();
const Order = require("./../DB/model/orderModel");
const mongoose = "mongoose";

router.post("/", authorized, async (req, res) => {
  console.log(req.body);
  try {
    const newOrder = new Order({
      user_id: req.body.user_id,
      product: req.body.product,
      quantity: req.body.quantity,
      // isPayed : req.body.isPayed,
      // isdelivered : req.body.isdelivered,
      // delivredAt : req.body.delivredAt,
      // productsCost : req.body.productsCost,
      // deliveryCost : req.body.deliveryCost,
      // taxes : req.body.taxes,
      // total : req.body.total,
      // adresse : req.body.adresse,
    });
    await newOrder.save()
    const productId = { product: req.body.product }
    const orderCreated = await Order.findOne({ ...productId }).populate("product");
    res.status(201).send(orderCreated);
  } catch (err) {
    res.send(err);
    console.log(err.message);
  }
});

router.get("/",authorized, async (req, res) => {
  // console.log("this is token",req.headers.authorization.split(" ")[1]);
  const user_id = { user_id: req.query.user_id };
  console.log("userid", user_id);
  console.log("req.user");
  try {
    const orders = await Order.find({ ...user_id }).populate("product");
    res.status(201).send(orders);
  } catch (err) {
    res.send(err);
    console.log(err.message);
  }
});

router.patch("/:id",authorized, async (req, res) => {
  try {
    console.log(req.body);
    const quantity = { quantity: req.body.valueUpate };
    const orders = await Order.findByIdAndUpdate(req.params.id, quantity, {
      new: true,
      useFindAndModify: false,
    });
    res.status(201).send(orders);
  } catch (err) {
    res.send(err);
    console.log(err.message);
  }
});

router.delete("/:id",authorized, async (req, res) => {
  try {
    console.log("deleteAction");
    const orders = await Order.findByIdAndDelete(req.params.id, {
      useFindAndModify: false,
    });
    res.status(201).send(orders);
  } catch (err) {
    console.log(err.message);
    res.send(err);
  }
});

module.exports = router;
