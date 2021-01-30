const express = require('express');
const router = express.Router();
const Order = require ('./../DB/model/orderModel');
const mongoose = ('mongoose');

router.post('/', async (req, res) => {
    const neworder = new Order ({
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        isPayed : req.body.isPayed,
        isdelivered : req.body.isdelivered,
        delivredAt : req.body.delivredAt,
        productsCost : req.body.productsCost,
        deliveryCost : req.body.deliveryCost,
        taxes : req.body.taxes,
        total : req.body.total,
        adresse : req.body.adresse,
        productItems : req.body.productItems,
    })
    const neworderCreat = await neworder.save();
    res.status(201).send({message : "new order created", neworderCreat});
});



router.get("/", async(req, res) => {
    try {
        const orders = await Order.find(req.query).populate('user');
        res.status(201).send(orders);
    } catch(err) {
        res.send(err)
        console.log(err.message)
    }
})

router.get("/", async(req, res) => {
    try {
        const orders = await Order.find(req.query);
        res.status(201).send(orders);
    } catch(err) {
        res.send(err)
        console.log(err.message)
    }
})

router.get("/myaccount", async(req, res) => {
    try {
        const orders = await Order.find({user :req.user._id});
        res.status(201).send(orders);
    } catch(err) {
        res.send(err)
        console.log(err.message)
    }
})



router.patch("/:id", async(req, res) => {
    try {
        const orders = await Order.findByIdAndUpdate(req.params.id,req.body,{new : true, useFindAndModify : false});
        res.status(201).send(orders);
    } catch(err) {
        res.send(err)
        console.log(err.message)
    }
})

router.delete("/:id", async(req, res) => {
    try {
        const orders = await Order.findByIdAndDelete(req.params.id,{useFindAndModify : false})
        res.status(201).send(orders);
    } catch(err) {
        console.log(err.message)
        res.send(err)
    }
})

module.exports = router;