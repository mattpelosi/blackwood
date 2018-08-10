const { MongoClient } = require("mongodb");

let _db = null;

function connect(url) {
  if (_db !== null) {
    return Promise.resolve(_db);
  }

  MongoClient.connect(
    url,
    { useNewUrlParser: true },
    (err, client) => {
      if (err) console.log(new Error(err));
      _db = client.db("the-blackwood");
    }
  );
}

module.exports = {
  connect,
  connection: { db: () => _db }
};
