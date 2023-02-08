// ************ Require's ************
const express = require("express");
const router = express.Router();

// ************ Controller Require ************
const mainController = require("../controllers/mainController");

router.get("/", mainController.index);
//router.???('/search', mainController.search);
//router.get("/products/detail/:id", mainController.detail);

module.exports = router;
