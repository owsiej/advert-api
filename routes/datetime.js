const express = require("express");
const moment = require("moment");
const router = express.Router();

router.get("/", (req, res) => {
  const currentDate = moment().format("LLL");
  res.send(currentDate);
});

module.exports = router;
