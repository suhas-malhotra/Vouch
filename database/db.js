const { MongoClient } = require("mongodb");
//for process env
const dotenv = require("dotenv").config();

// Connection URL
const url =
  "mongodb+srv://suhass:pooja@cluster0.rspit.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);

const connectDB = async () => {
  // Use connect method to connect to the server
  try {
    await client.connect();
    console.log("Connected successfully to server");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
