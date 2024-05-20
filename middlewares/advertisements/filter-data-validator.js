const {
  validateObjectPropertyValues,
} = require("../../utils/validators-engine.js");
const validatorFilterConfig = require("../../validators/filter-validator-config.js");
const mapDatabaseFilter = require("../../services/database-query-config.js");

const filterDataValidator = (req, res, next) => {
  if (Object.keys(req.query).length === 0) {
    next();
  } else {
    try {
      const validatedQuery = validateObjectPropertyValues(
        req.query,
        validatorFilterConfig
      );
      const filterQuery = Object.entries(validatedQuery).reduce(
        (acc, [key, value]) => {
          acc.push(mapDatabaseFilter(key, value));
          return acc;
        },
        []
      );
      res.locals.filterQuery = filterQuery;
      next();
    } catch (error) {
      console.log(error);
      res.status(400);
      res.send(error.message);
    }
  }
};

module.exports = filterDataValidator;
