// ************ Require's ************
const { log } = require("console");
const express = require("express");
const multer = require("multer");
const router = express.Router();
const path = require("path");

//********** Multer ************/
const storage = multer.diskStorage({
      destination: (req, file, cb) => {
            let folder = path.join(__dirname, "../../public/images/products");
            cb(null, folder /* "./public/images/products" */);
      },
      filename: (req, file, cb) => {
            cb(null, `${Date.now()}_${req.body.name}_${path.extname(file.originalname)}`);
      },
});
const uploadFile = multer({ storage });

// ************ Controller Require ************
const productsController = require("../controllers/productsController");

/*** GET ALL PRODUCTS ***/
router.get("/", productsController.index);

/*** CREATE ONE PRODUCT ***/
router.get("/create/", productsController.create);
router.post("/", uploadFile.single("imageProduct"), productsController.store);

/*** GET ONE PRODUCT ***/
router.get("/detail/:id", productsController.detail);

/*** EDIT ONE PRODUCT ***/
router.get("/edit/:id", productsController.edit);
router.put("/edit/:id", uploadFile.single("imageProduct"), productsController.update);

/*** DELETE ONE PRODUCT***/
router.delete("/delete/:id", productsController.destroy);

module.exports = router;
