const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const routes = require("./routes.js");
const mongo = require("./mongodb");
const dotenv = require("dotenv");

dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("withCredentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Cookie, x-access-token"
  );
  next();
});

app.use(routes);

mongo
  .connect(process.env.MONGODB_URL)
  .then(app.listen(3050))
  .then(() => console.log(`MongoDB is connected`))
  .catch(err => {
    console.log(err);
    process.exit(1);
  });
