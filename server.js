const express = require("express");
const router = require("./routes");
const app = express();
const mongo = require("./mongodb.js");
const conn = mongo.connection;
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(router);

const url = `mongodb://mpelosi1:STE1nwaY1!@ds020208.mlab.com:20208/the-blackwood`;
mongo.connect(url);

console.log(conn.db());

process.on("unhandledRejection", error => {
  console.log("unhandled rejection", error);
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Express is listening on port ${port}`);
