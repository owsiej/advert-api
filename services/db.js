const { MongoClient, ServerApiVersion } = require("mongodb");

const client = new MongoClient(process.env.MONGO_CONNECTION_STRING, {
  serverApi: ServerApiVersion.v1,
});

async function databaseConnect() {
  await client.connect();
  await client.db("admin").command({ ping: 1 });

  const db = client.db(process.env.MONGO_DATABASE_NAME);
  return db;
}

async function databaseDisconnect() {
  await client.close();
}

module.exports = {
  databaseConnect,
  databaseDisconnect,
};
