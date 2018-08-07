const { MongoClient } = require("mongodb");

let _db = null;

function connect(url) {
  if (_db !== null) {
    return Promise.resolve(_db);
  }

  return MongoClient.connect(
    url,
    { useNewUrlParser: true }
  ).then(client => (_db = client));
}

module.exports = {
  connect,
  connection: { db: () => _db }
};
