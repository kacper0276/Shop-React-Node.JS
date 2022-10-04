const express = require("express");
const router = new express.Router();
const cors = require("cors");
const DatabaseController = require("../controllers/database-controller");
const upload = require("../helpers/uploader");

// MAIN PAGE
router.get("/products", DatabaseController.getAllProducts);

// SUMMARY
router.post("/summary", cors(), DatabaseController.summary);

// USERS
router.post("/login", cors(), DatabaseController.login);
router.post("/register", cors(), DatabaseController.addNewUser);
router.post("/editprofile", cors(), DatabaseController.editProfile);

// PRODUCTS
router.get(
  "/getalluserproducts/:owner",
  cors(),
  DatabaseController.showAllProductsUser
);
router.post(
  "/addproducts",
  cors(),
  upload.single("image"),
  DatabaseController.addProduct
);
router.get(
  "/deleteuserproduct/:id",
  cors(),
  DatabaseController.deleteUserProduct
);
router.get(
  "/editformproduct/:id",
  cors(),
  DatabaseController.showEditFormProduct
);
router.post(
  "/editproduct",
  cors(),
  upload.single("image"),
  DatabaseController.editProduct
);

// SEARCH
router.post("/search/:words", cors(), DatabaseController.searchResult);

module.exports = router;
