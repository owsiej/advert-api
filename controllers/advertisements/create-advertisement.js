const ObjectId = require("mongodb").ObjectId;

const Advertisement = require("../../models/advertisement.js");
const { databaseConnect, databaseDisconnect } = require("../../services/db");

const createAdController = async (req, res) => {
  const userId = new ObjectId(`${req.userId}`);

  const {
    title,
    description,
    author,
    category,
    tags,
    price,
    paidPeriodInWeeks,
  } = req.body;
  const newAd = new Advertisement(
    title,
    description,
    author,
    category,
    tags,
    price,
    paidPeriodInWeeks,
    userId
  );
  try {
    const db = await databaseConnect();

    const collection = db.collection(process.env.MONGO_AD_COLLECTION);
    const insertedAd = await collection.insertOne(newAd);

    res.status(201);
    res.send(insertedAd);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send(error.message);
  } finally {
    await databaseDisconnect();
  }
};

module.exports = createAdController;
