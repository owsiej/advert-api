const ObjectId = require("mongodb").ObjectId;

const { databaseConnect, databaseDisconnect } = require("../../services/db");
const {
  textRepresentation,
  htmlRepresentation,
} = require("../../utils/response-object-representations.js");

const getAdByIdController = async (req, res) => {
  const userId = new ObjectId(`${req.userId}`);
  const adId = String(req.params.adId);

  try {
    const db = await databaseConnect();
    const collection = db.collection(process.env.MONGO_AD_COLLECTION);
    const ad = await collection.findOne({
      _id: new ObjectId(adId),
      userId: userId,
    });
    if (ad) {
      res.status(200);
      res.format({
        "text/plain": function () {
          res.send(textRepresentation(ad));
        },
        "text/html": function () {
          res.send(htmlRepresentation(ad));
        },
        "application/json": function () {
          res.send(ad);
        },
      });
    } else {
      res.status(404);
      res.send("Ad of given id does not exists.");
    }
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send(error.message);
  } finally {
    await databaseDisconnect();
  }
};

module.exports = getAdByIdController;
