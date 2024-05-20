const ObjectId = require("mongodb").ObjectId;

const { databaseConnect, databaseDisconnect } = require("../../services/db");

const getAllAdsController = async (req, res) => {
  const userId = new ObjectId(`${req.userId}`);
  try {
    const db = await databaseConnect();
    const collection = db.collection(process.env.MONGO_AD_COLLECTION);

    const adOutput = await collection
      .find({ userId: userId })
      .sort({ validTill: -1 })
      .toArray();

    res.send(adOutput);
    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send(error.message);
  } finally {
    await databaseDisconnect();
  }
};

module.exports = getAllAdsController;
