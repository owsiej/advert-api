const { patternValidator } = require("./validators.js");

const validatorUserConfig = {
  login: {
    validator: patternValidator,
    pattern: /^[A-Z-a-z0-9]{4,15}$/,
    errorMessage:
      "must have 4 to 15 characters with no special symbols/digits allowed.",
  },
  password: {
    validator: patternValidator,
    pattern:
      /^(?=.*[a-ząężźłćńśó])(?=.*[A-ZĄĘŻŹŁĆŃŚÓ])(?=.*\d)(?=.*[@$!%*#?&_])[A-Za-ząężźłćńśóĄĘŻŹŁĆŃŚÓ\d@$!#%*?&_]{7,20}$/,
    errorMessage:
      "must have 7 to 20 characters with at least one small,big letter, one digit and special symbol.",
  },
};

module.exports = validatorUserConfig;
