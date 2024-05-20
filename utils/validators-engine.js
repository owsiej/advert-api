function validateObjectPropertyValues(obj, mainConfig) {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    const config = mainConfig[key];
    if (!config) {
      throw new Error(
        `Invalid property name: ${key}. Supported params: ${Object.keys(
          mainConfig
        )}`
      );
    }
    const validator = config["validator"];
    const newVal = validator(key, value, config);
    return {
      ...acc,
      [key]: newVal,
    };
  }, {});
}

module.exports = {
  validateObjectPropertyValues,
};
