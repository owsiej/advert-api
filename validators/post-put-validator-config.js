const {
  textValidator,
  numberValidator,
  tagsValidator,
} = require("./validators.js");

const validatorPostPutConfig = {
  title: {
    validator: textValidator,
    maxLength: 20,
    areSpecialAllowed: false,
  },
  description: {
    validator: textValidator,
    maxLength: 100,
    areSpecialAllowed: true,
  },
  author: {
    validator: textValidator,
    maxLength: 20,
    areSpecialAllowed: false,
  },
  category: {
    validator: textValidator,
    maxLength: 20,
    areSpecialAllowed: false,
  },
  tags: {
    validator: tagsValidator,
    maxLength: 20,
    areSpecialAllowed: false,
  },
  price: {
    validator: numberValidator,
  },
  paidPeriodInWeeks: {
    validator: numberValidator,
  },
};

module.exports = validatorPostPutConfig;
