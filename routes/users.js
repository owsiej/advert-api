const express = require("express");
const multer = require("multer");

const userDataValidator = require("../middlewares/user/user-data-validator.js");
const createUserController = require("../controllers/users/create-user.js");
const loginUserController = require("../controllers/users/login-user.js");

const upload = multer();
const router = express.Router();

router.use(upload.none());

router.post("/register", userDataValidator, createUserController);

router.post("/login", loginUserController);

module.exports = router;
