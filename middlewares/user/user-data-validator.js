const {
  validateObjectPropertyValues,
} = require("../../utils/validators-engine.js");
const validatorUserConfig = require("../../validators/user-validator-config.js");

const userDataValidator = (req, res, next) => {
  const body = req.body;
  try {
    validateObjectPropertyValues(body, validatorUserConfig);
    next();
  } catch (error) {
    console.log(error);
    res.status(400);
    res.send(error.message);
  }
};

module.exports = userDataValidator;
