const userService = require("../services/users.service");

module.exports = {
  registerUser: registerUser
};

function registerUser(req, res) {
  userService
    .registerUser(req.body)
    .then(response => res.json(response))
    .catch(err => console.log(err));
}
