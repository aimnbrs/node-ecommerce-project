const express = require("express");
const router = express.Router();
const Blogs = require("./../DB/model/blogsModel");
const mongoose = require("mongoose");


router.get("/", async (req, res) => {
  try {
    const blogs = await Blogs.find(req.query);
    res.status(201).send(blogs);
    console.log(blogs)
  } catch (err) {
    console.log(err.message);
    res.status(201).send(`Error :${err.message}`)
  }
});


module.exports = router;
