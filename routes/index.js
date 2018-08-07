const router = require("express").Router();
const userRoutes = require("./user.routes.js");

module.exports = router;

router.use("/api/users", userRoutes);
