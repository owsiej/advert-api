const ObjectId = require("mongodb").ObjectId;

const { databaseConnect, databaseDisconnect } = require("../../services/db");

const updateAdController = async (req, res) => {
  const userId = new ObjectId(`${req.userId}`);
  const adId = String(req.params.adId);
  const body = req.body;
  body.lastModified = "$$NOW";
  const updatePipeline = [
    {
      $set: body,
    },
  ];
  if (body.paidPeriodInWeeks) {
    updatePipeline.push({
      $set: {
        validTill: {
          $dateAdd: {
            startDate: "$creationTime",
            unit: "week",
            amount: body.paidPeriodInWeeks,
          },
        },
      },
    });
  }
  try {
    const db = await databaseConnect();
    const collection = db.collection(process.env.MONGO_AD_COLLECTION);
    const ad = await collection.updateOne(
      {
        _id: new ObjectId(adId),
        userId: userId,
      },
      updatePipeline
    );
    if (ad.matchedCount === 0) {
      res.status(404);
      res.send("Ad of given id does not exists.");
    } else {
      res.status(200);
      res.send(ad);
    }
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send(error.message);
  } finally {
    await databaseDisconnect();
  }
};

module.exports = updateAdController;
