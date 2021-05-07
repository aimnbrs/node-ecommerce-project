const jwt = require("jsonwebtoken");
const userModel = require("../DB/model/userModel");
require("dotenv").config();
// require('dotenv').config({path: __dirname + './../dotenv'});

const getToken = (userInfos) => {
  return jwt.sign(
    {
      _id: userInfos._id,
      name: userInfos.name,
      email: userInfos.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "2h",
    }
  );
};

const authorized = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log("this is token here", req.headers.authorization.split(" ")[1]);
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("decoded",decoded);
      req.user = decoded;
    next();
    } else {
      throw "token is not valide";
    }
  } catch (err) {
    return res.status(201).send(`Error auth : ${err.message || err}`);
  }
};

const currentUser = async (req, res,next) => {
  try {
    console.log("this is current here", req.headers.authorization);

    const token = req.headers.authorization.split(" ")[1] ;
    const loggingAttempt = req.query.email !== "undefined"  ;
    console.log("token and attemp",token, loggingAttempt, token ==="undefined");
    if (loggingAttempt) {
    // console.log("pass",loggingAttempt);
        next();
        return;
      }
    if (token !== 'undefined') {
    console.log("token",token);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.email) {
    // console.log("decoded.email",decoded.email);

        const user = await userModel.find({
          email: decoded.email,
        });
        console.log("thi is user",user[0]);
        res.status(201).send(user[0]);
      }
     
    }  
    if (token === 'undefined') {
        console.log("no session");
      throw "user is not authenticated";
      
    }
  } catch(err) {
    return res.status(201).send(`Error token : ${err.message || err}`);
  }
};
module.exports = { getToken, authorized, currentUser };
