const verifyToken = require("../utils/verify-jwt-token.js");

const authenticateToken = async (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    res.status(401);
    return res.send("Authorization header is missing");
  }
  try {
    const verifiedToken = await verifyToken(token);
    req.userId = verifiedToken.id;
    next();
  } catch (error) {
    console.log(error);
    res.status(401);
    res.send(error.message);
  }
};
module.exports = authenticateToken;
