const connectDB = require("./database/db");
//connect mongoDB database to the backend server
connectDB();
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// All Routes
app.use("/", require("./routes"));

//Default Route
app.get("/", (req, res) => {
  return res.status(200).json({ working: true });
});
//Incase of Invalid route
app.get("/*", (req, res) => {
  return res.status(401).json({ message: "Route does not exist :(" });
});



const port = 80 || process.env.PORT;
//Server
app.listen(port, () => {
  console.log("Server started at port", port);
});