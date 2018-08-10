const express = require("express");
const router = require("./routes");
const app = express();
const mongo = require("./mongodb.js");
// const conn = mongo.connection;
const bodyParser = require("body-parser");
require("dotenv").config();

app.use(bodyParser.json());
app.use(router);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});
console.log(__dirname + "/client/build/index.html")

const url = process.env.MONGODB_URL
console.log(url);

mongo.connect(url);

process.on("unhandledRejection", error => {
  console.log("unhandled rejection", error);
});


const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Server is listening on port ${port}`);
