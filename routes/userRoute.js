const express = require("express");
const router = express.Router();
const User = require("./../DB/model/userModel");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { getToken, authorized, currentUser } = require("../middleware");

router.post("/signup", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
      phoneNumber: req.body.phoneNumber || "",
      avatarUrl: req.body.avatarUrl,
    });
    const newUserCreat = await newUser.save();
    console.log("newUserCreat",newUserCreat._id);
    const getUser = newUserCreat[0];
    res.cookie("token", getToken(newUserCreat), {
      maxAge: 2 * 60 * 60 * 1000,
    });
    res.status(201).send({
      id: newUserCreat._id,
      name: newUserCreat.name,
      email: newUserCreat.email,
      phoneNumber: newUserCreat.phoneNumber,
      avatarUrl: newUserCreat.avatarUrl,
    });
  } catch (err) {
    res.status(201).send(`Error sigUp : ${err}`);
    console.log(err.message);
  }
});

router.get("/signin", currentUser, async (req, res) => {
  try {
    const user = await User.find({
      email: req.query.email,
    });
    console.log('user',user);
    if (user.length == 0) {
      throw "Invalid Email Or Password";
    } else {
      const match = await bcrypt.compare(req.query.password, user[0].password);
      if (match) {
        console.log("ths is match",match);
        res.cookie("token", getToken(user[0]), { maxAge: 2 * 60 * 60 * 1000 });
        res.status(201).send(user[0]);
      } else {
        console.log("token invalid");
        throw "token invalid";
      }
    }
  } catch (err) {
    console.log(err);
    res.status(201).send(`Error signIn : ${err || err.message}`);
  }
});

router.patch("/:id", authorized, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.query, {
      new: true,
      useFindAndModify: false,
    });
    console.log(user);
    const getUser = user[0];
    res.status(201).send({
      id: getUser._id,
      name: getUser.name,
      email: getUser.email,
      phoneNumber: getUser.phoneNumber,
      avatarUrl: getUser.avatarUrl,
    });
  } catch (err) {
    console.log(err.message);
    res.status(201).send(`Error patchUser : ${err.message}`);
  }
});

router.delete("/:id", authorized, async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id, {
      useFindAndModify: false,
    });
    console.log(user);
    const getUser = user[0];
    res.status(201).send({
      id: getUser._id,
      name: getUser.name,
      email: getUser.email,
      phoneNumber: getUser.phoneNumber,
      avatarUrl: getUser.avatarUrl,
    });
  } catch (err) {
    console.log(err.message);
    res.status(201).send(`Error deleteOrder : ${err.message}`);
  }
});

module.exports = router;
