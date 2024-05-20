const jwt = require("jsonwebtoken");

const verifyToken = async (token) => {
  const secretKey = process.env.JWT_SECRET_KEY;
  const options = {
    ignoreExpiration: false,
  };
  return jwt.verify(token, secretKey, options);
};

module.exports = verifyToken;
