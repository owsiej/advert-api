const headerValidator = (req, res, next) => {
  const headers = req.headers;
  if (!headers["content-type"].toLowerCase().includes("multipart/form-data")) {
    res.status(400);
    res.send(
      "Wrong content-type header. Data must be passed via body form-data using multipart/form-data header."
    );
  } else {
    next();
  }
};

module.exports = headerValidator;
