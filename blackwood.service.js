mongodb = require("./mongodb");
ObjectId = mongodb.ObjectId;
conn = mongodb.connection;

module.exports = {
  create: create,
  read: read,
  update: update,
  delete: _delete,
  readAll: readAll
};

function read(id) {
  const docId = new ObjectId(id);
  return conn
    .db()
    .collection("blackwood")
    .findOne({ _id: docId })
    .then(result => {
      return result;
    });
}

function readAll() {
  return conn
    .db()
    .collection("blackwood")
    .find()
    .toArray()
    .then(users => {
      users = users.map(user => {
        user._id = user._id.toString();
        return user;
      });
      return users;
    });
}

function update(id, doc) {
  const docId = new ObjectId(id);
  return conn
    .db()
    .collection("blackwood")
    .replaceOne({ _id: docId }, doc)
    .then(result => {
      return result;
    });
}

function create(item) {
  return conn
    .db()
    .collection("blackwood")
    .insert(item)
    .then(result => {
      return result.ops;
    });
}

function _delete(id) {
  const docId = new ObjectId(id);
  return conn
    .db()
    .collection("blackwood")
    .deleteOne({ _id: docId })
    .then(result => {
      return result;
    });
}
