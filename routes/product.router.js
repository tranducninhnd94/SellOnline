const express = require("express");
const router = express.Router();

const validation = require("express-validation");
const entryDataValidate = require("./validation/entry.data.validate");

const ProductManagerController = require("../controllers/product/admin/product-manager.controller");
const productManagerController = new ProductManagerController();

const Auth = require("../middleware/auth.middleware");
const auth = new Auth();

router.post(
  "/store/:storeId/:nameUnique/product/create",
  auth.isEmployee,
  validation(entryDataValidate.createProduct),
  productManagerController.createProduct
);

module.exports = router;
