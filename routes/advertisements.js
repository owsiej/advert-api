const express = require("express");
const multer = require("multer");

const postPutDataValidator = require("../middlewares/advertisements/post-put-data-validator.js");
const requiredPropertiesValidator = require("../middlewares/advertisements/required-properties-validator.js");
const filterDataValidator = require("../middlewares/advertisements/filter-data-validator.js");
const idValidator = require("../middlewares/advertisements/id-validator.js");
const headerValidator = require("../middlewares/advertisements/request-headers.js");
const authenticateToken = require("../middlewares/authenticate-jwt-token.js");

const createAdController = require("../controllers/advertisements/create-advertisement.js");
const deleteAdController = require("../controllers/advertisements/delete-advertisement.js");
const getAdByIdController = require("../controllers/advertisements/get-advertisement-by-id.js");
const updateAdController = require("../controllers/advertisements/update-advertisement.js");
const getAdsByQueryController = require("../controllers/advertisements/get-advertisements-by-query.js");
const getAllAdsController = require("../controllers/advertisements/get-all-advertisements.js");

const upload = multer();
const router = express.Router();

router.use(upload.none());

router.get("/", authenticateToken, filterDataValidator, async (req, res) => {
  if (res.locals.filterQuery) {
    await getAdsByQueryController(req, res);
  } else {
    await getAllAdsController(req, res);
  }
});

router.get("/:adId", authenticateToken, idValidator, getAdByIdController);

router.post(
  "/add",
  authenticateToken,
  headerValidator,
  requiredPropertiesValidator,
  postPutDataValidator,
  createAdController
);

router.put(
  "/:adId",
  authenticateToken,
  headerValidator,
  idValidator,
  postPutDataValidator,
  updateAdController
);

router.delete("/:adId", authenticateToken, idValidator, deleteAdController);

module.exports = router;
