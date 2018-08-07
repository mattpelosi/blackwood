module.exports = {
  registerUser: registerUser
};

function registerUser(formData) {
  console.log("connected");
  return Promise.resolve(formData);
}
