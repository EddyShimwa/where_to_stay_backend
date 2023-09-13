// const express = require('express');
const db = require('../models');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const User = db.User;

const isAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
        return res
          .status(401)
          .json({ msg: "No token, User authorization failed!" });
      }

    let decoded;

        decoded = jwt.verify(token, process.env.JWT_SECRET);

  // if (!decoded) {
  //   return res
  //     .status(401)
  //     .json({ msg: "Token is not valid, User authorization failed!" });
  // }

     const user = await User.findOne({ where: { id: decoded.id } });
     // checking if the user exists 

        if (!user) {
          return res.status(404).json({ msg: "User does not exist" });
         }
      
      req.user = user;
  next();

  }
  catch (err) {
    return res.status(401).json({ msg: "Token is not Valid" });  
  }
  
}

const isStudent = async (req, res, next) => {
  try {
    if(req.user.role !== 'student') {
      return res.status(401).json({ msg: "You are not a student" });
    }
  next();

  }
  catch (err) {
    return res.status(500).json({ msg: "Something went wrong" });  
  }
  
}


const isLandLord = async (req, res, next) => {
  try {
    if(req.user.role !== 'landlord') {
      return res.status(401).json({ msg: "You are not a landlord" });
    }

  next();

  }
  catch (err) {
    return res.status(500).json({ msg: "Something went wrong" });  
  }
  
}


module.exports = {
  isAuth,
  isStudent,
  isLandLord
}