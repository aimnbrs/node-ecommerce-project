const express = require("express");
const router = express.Router();
const User = require("./../DB/model/userModel");
const mongoose = require("mongoose");

router.post("/signup", async (req, res) => {
  try {
    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      phoneNumber: req.body.phoneNumber,
      avatarUrl: req.body.avatarUrl,
    });
    const newUserCreat = await newUser.save();
    res.status(201).send({
      id : newUserCreat._id,
      name: newUserCreat.name,
      email: newUserCreat.email,
      password: newUserCreat.password,
      phoneNumber: newUserCreat.phoneNumber,
      avatarUrl: newUserCreat.avatarUrl,
    });
  } catch (err) {
    res.send(err.message);
    console.log(err.message);
  }
});

router.get("/signin", async (req, res) => {
  try {
    const user = await User.find({
        $and : [
            {email : req.query.email},
            {password : req.query.password}
        ]
        
    });
    res.status(201).send(user);
    console.log(user,req.query.email,req.query.password)
  } catch (err) {
    console.log(err.message);
    res.status(400).send({ message: 'Invalid Email or Password.' })
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.query, {
      new: true,
      useFindAndModify: false,
    });
    res.status(201).send(user);
  } catch (err) {
    console.log(err.message);
    res.status(400).send({ message: 'Invalid Patch' })
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id, {
      useFindAndModify: false,
    });
    res.status(201).send(user);
  } catch (err) {
    console.log(err.message);
    res.status(400).send({ message: 'Invalid Delete' })
  }
});

module.exports = router;
