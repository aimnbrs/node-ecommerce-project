const express = require('express');
const router = express.Router();
const Product = require ('./../DB/model/productModel');
const mongoose = ('mongoose');

router.post('/', async (req, res) => {
    try {
        const newProduct = new Product ({
            _id : new mongoose.Types.ObjectId(),
            category : req.body.category,
            model : req.body.model,
            price : req.body.price,
            url : req.body.url
            })
            const newProductCreat = await newProduct.save();
            res.status(201).send({message : "new product created", newProductCreat});
    } catch(err) {
        console.log(err.message)
        res.send(err)
    }
  
});



router.get("/", async(req, res) => {
    try {
        const products = await Product.find(req.query);
        res.status(201).send(products);
    } catch(err) {
        res.send(err)
        console.log(err.message)
    }
})



router.patch("/:id", async(req, res) => {
    try {
        const products = await Product.findByIdAndUpdate(req.params.id,req.body,{new : true, useFindAndModify : false});
        res.status(201).send(products);
    } catch(err) {
        res.send(err)
        console.log(err.message)
    }
})

router.delete("/:id", async(req, res) => {
    try {
        const products = await Product.findByIdAndDelete(req.params.id,{useFindAndModify : false})
        res.status(201).send(products);
    } catch(err) {
        console.log(err.message)
        res.send(err)
    }
})

module.exports = router;