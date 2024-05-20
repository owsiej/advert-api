const { hasAllRequiredProperties } = require("../../validators/validators.js");
const validatorPostPutConfig = require("../../validators/post-put-validator-config.js");

const advertisementPropertiesValidator = (req, res, next) => {
  const body = req.body;
  try {
    hasAllRequiredProperties(body, validatorPostPutConfig);

    next();
  } catch (error) {
    console.log(error);
    res.status(400);
    res.send(error.message);
  }
};

module.exports = advertisementPropertiesValidator;
