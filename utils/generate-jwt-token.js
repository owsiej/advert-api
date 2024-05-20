const jwt = require("jsonwebtoken");

const generateToken = async (userId) => {
  payload = {
    id: userId,
  };
  const secretKey = process.env.JWT_SECRET_KEY;
  const options = {
    expiresIn: "1h",
  };
  return jwt.sign(payload, secretKey, options);
};

module.exports = generateToken;
