const bcrypt = require("bcrypt");

const { databaseConnect, databaseDisconnect } = require("../../services/db.js");
const User = require("../../models/user.js");

const createUserController = async (req, res) => {
  const { login, password } = req.body;
  try {
    const db = await databaseConnect();
    const collection = db.collection(process.env.MONGO_USER_COLLECTION);
    const ifUserAlreadyExists = await collection.findOne(
      { login: login },
      { projection: { _id: 0, login: 1 } }
    );
    if (ifUserAlreadyExists) {
      res.status(409);
      return res.send("User already exists.");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User(login, hashedPassword);
    const insertedUser = await collection.insertOne(user);
    res.status(201);
    res.send(insertedUser);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send(error.message);
  } finally {
    await databaseDisconnect();
  }
};

module.exports = createUserController;
