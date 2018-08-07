const router = require("express").Router();
const userController = require("../controllers/users.controller");

module.exports = router;

router.post("/register", userController.registerUser);
