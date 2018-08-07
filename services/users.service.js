const conn = require("../mongodb").connection;

module.exports = {
  registerUser: registerUser
};

async function registerUser(formData) {
  const result = await conn
    .db()
    .collection("users")
    .insertOne(formData);
  return result.insertedId;
}
