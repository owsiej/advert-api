const ObjectId = require("mongodb").ObjectId;

const { databaseConnect, databaseDisconnect } = require("../../services/db.js");

const deleteAdController = async (req, res) => {
  const userId = new ObjectId(`${req.userId}`);
  const adId = String(req.params.adId);

  try {
    const db = await databaseConnect();
    const collection = db.collection(process.env.MONGO_AD_COLLECTION);

    const deleteResult = await collection.deleteOne({
      _id: new ObjectId(adId),
      userId: userId,
    });
    if (deleteResult.deletedCount === 0) {
      res.status(404);
      res.send("Ad with requested id does not exits.");
    } else {
      res.status(200);
      res.send("Requested ad deleted.");
    }
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send(error.message);
  } finally {
    await databaseDisconnect();
  }
};

module.exports = deleteAdController;
