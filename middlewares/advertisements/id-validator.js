const ObjectId = require("mongodb").ObjectId;

const idValidator = (req, res, next) => {
  const adId = req.params.adId;
  if (!ObjectId.isValid(adId)) {
    res.status(400);
    res.send("Wrong id format.");
  } else {
    next();
  }
};

module.exports = idValidator;
