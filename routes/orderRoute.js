const express = require("express");
const router = express.Router();
const Order = require("./../DB/model/orderModel");
const mongoose = "mongoose";

router.post("/", async (req, res) => {
  console.log(req.body);
  const newOrder = new Order({
    user_id: req.body.user_id,
    product: req.body.product,
    quantity : req.body.quantity,
    // isPayed : req.body.isPayed,
    // isdelivered : req.body.isdelivered,
    // delivredAt : req.body.delivredAt,
    // productsCost : req.body.productsCost,
    // deliveryCost : req.body.deliveryCost,
    // taxes : req.body.taxes,
    // total : req.body.total,
    // adresse : req.body.adresse,
  });
  const newOrderCreat = await newOrder.save();
  res.status(201).send({ message: "new order created", newOrderCreat });
});



router.get("/", async (req, res) => {
  const user_id = {user_id : req.query.user_id};
  console.log('userid',user_id)
  try {
    const orders = await Order.find({ ...user_id }).populate("product");
    res.status(201).send(orders);
  } catch (err) {
    res.send(err);
    console.log(err.message);
  }
});



router.patch("/:id", async (req, res) => {
  try {
    console.log(req.body)
    const quantity = {quantity : req.body.valueUpate}
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

router.delete("/:id", async (req, res) => {
  try {
    console.log("deleteAction")
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
