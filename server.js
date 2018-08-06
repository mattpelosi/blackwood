const express = require("express");
const router = express.Router();
const app = express();

router.post("/api/register-user", (req, res) => {
  res.json("connected");
  console.log("connected");
});

app.use(router);

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Express is listening on port ${port}`);
