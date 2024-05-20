const {
  textValidator,
  numberValidator,
  tagsValidator,
  dateValidator,
} = require("./validators.js");

const validatorFilterConfig = {
  title: {
    validator: textValidator,
    maxLength: 20,
    areSpecialAllowed: false,
  },
  description: {
    validator: textValidator,
    maxLength: 20,
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
  priceGte: {
    validator: numberValidator,
  },
  priceLte: {
    validator: numberValidator,
  },
  createdAfter: {
    validator: dateValidator,
  },
};

module.exports = validatorFilterConfig;
