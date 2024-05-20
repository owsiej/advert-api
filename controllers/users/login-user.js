const bcrypt = require("bcrypt");

const { databaseConnect, databaseDisconnect } = require("../../services/db.js");
const generateToken = require("../../utils/generate-jwt-token.js");

const loginUserController = async (req, res) => {
  const { login, password } = req.body;
  try {
    const db = await databaseConnect();
    const collection = db.collection(process.env.MONGO_USER_COLLECTION);
    const user = await collection.findOne({
      login: login,
    });
    if (!user) {
      res.status(404);
      return res.send("Given user does not exists.");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      const token = await generateToken(user._id);
      res.status(200);
      res.send(token);
    } else {
      res.status(401);
      res.send("Wrong password.");
    }
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send(error.message);
  } finally {
    await databaseDisconnect();
  }
};

module.exports = loginUserController;
