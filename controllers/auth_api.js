const express = require("express");
const JWT = require("jsonwebtoken");
const { MongoClient } = require("mongodb");

const url =
  "mongodb+srv://suhass:pooja@cluster0.rspit.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);
const db = client.db("suhas");
const Admin = db.collection("Admin");


module.exports.getToken = async (req, res) => {
  const { email, password } = req.body;
  //findin the admin details
  const admin = await Admin.findOne({ email: email });
  console.log(admin);
  //if invalid admin email
  if (admin.length === 0) {
    return res.status(404).json({ msg: "Admin not found" });
  }

  //if password do not match
  if (admin.password !== password) {
    return res.status(401).json({ msg: "Incorrect password" });
  }
  //making a token
  const token = JWT.sign({ admin }, process.env.SECRET_TOKEN, {
    expiresIn: "365d",
  });
  return res.status(200).json(token);
};
