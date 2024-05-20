const fs = require("fs");

const logRequests = (req, res, next) => {
  const logObject = {
    "Request received at": new Date(),
    "HTTP method": req.method,
    "Full URL": `${req.protocol}:/${req.get("host")}${req.originalUrl}`,
  };
  fs.appendFile("logs.txt", JSON.stringify(logObject) + "\n", (err) => {
    if (err) {
      throw err;
    }
  });
  next();
};

module.exports = logRequests;
