const moment = require("moment");

function hasAllRequiredProperties(obj, mainConfig) {
  const requiredProperties = Object.keys(mainConfig).sort();
  const givenProperties = Object.keys(obj).sort();
  if (requiredProperties.length !== givenProperties.length) {
    throw new Error(
      `Invalid amount of given properties. Only supported properties: ${requiredProperties}`
    );
  }
  if (requiredProperties.toString() !== givenProperties.toString()) {
    throw new Error(
      `You need to supply all required properties, like: ${requiredProperties}`
    );
  }
}

function textValidator(paramName, val, config) {
  isPresent(paramName, val);
  if (!config.areSpecialAllowed) {
    areSpecialSymbols(paramName, val);
  }
  maxLengthValidator(paramName, val, config.maxLength);
  return val;
}

function numberValidator(paramName, val) {
  if (Number(val) === 0) {
    throw new Error(`Value of ${paramName} can not be equal to 0.`);
  }
  if (!Number(val) || !Number.parseFloat(val)) {
    throw new Error(`Value of ${paramName} is not a number.`);
  }
  return Number(val);
}

function tagsValidator(paramName, val, config) {
  isPresent(paramName, val);
  const validatedTags = val.split(",").filter((tag) => tag.trim());

  validatedTags.forEach((el) =>
    textValidator(paramName, el, config.maxLength, config.areSpecialAllowed)
  );
  return validatedTags;
}

function dateValidator(paramName, date) {
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  if (date.search(datePattern) === -1) {
    throw new Error(`Wrong ${paramName} format. Use YYYY-MM-DD schema.`);
  }
  if (!moment(date).isValid()) {
    throw new Error("Invalid date");
  }
  return moment(date).toDate();
}

function isPresent(paramName, val) {
  if (!Boolean(val.trim())) {
    throw new Error(`Param ${paramName} can not be empty.`);
  }
  return true;
}
function areSpecialSymbols(paramName, val) {
  const specialSymbolsPattern =
    /^[A-Za-ząężźłćńśóĄĘŻŹŁĆŃŚÓ]*[\w\s-ąężźłćńśóĄĘŻŹŁĆŃŚÓ]*[A-Za-ząężźłćńśóĄĘŻŹŁĆŃŚÓ]+$/;

  if (val.search(specialSymbolsPattern) === -1) {
    throw new Error(
      `Value of ${paramName} can't have any special symbols besides '_' and '-' and only in the middle on the ${paramName}.`
    );
  }
  return false;
}

function maxLengthValidator(paramName, val, max) {
  if (val.length > max) {
    throw new Error(`${paramName} length must be max ${max} characters.`);
  }
}

function dateValidator(paramName, date) {
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  if (date.search(datePattern) === -1) {
    throw new Error(`Wrong ${paramName} format. Use YYYY-MM-DD schema.`);
  }
  if (!moment(date).isValid()) {
    throw new Error("Invalid date");
  }
  return moment(date).toDate();
}

function patternValidator(paramName, val, mainConfig) {
  if (val.search(mainConfig.pattern) === -1) {
    throw new Error(`Value of ${paramName} ${mainConfig.errorMessage}`);
  }
  return val;
}

module.exports = {
  textValidator,
  numberValidator,
  tagsValidator,
  dateValidator,
  patternValidator,
  hasAllRequiredProperties,
};
