const express = require("express");
const router = express.Router();

const validation = require("express-validation");
const entryDataValidate = require("./validation/entry.data.validate");

const StoreManagerController = require("../controllers/store/admin/store-manager.controller");
const storeManagerController = new StoreManagerController();

const Auth = require("../middleware/auth.middleware");
const auth = new Auth();

router
  .post(
    "/admin/store/:storeId/:nameUnique/update",
    validation(entryDataValidate.updateStore),
    auth.isAdmin,
    storeManagerController.updateStore
  )
  .post("/store/create", auth.isLogin, validation(entryDataValidate.createStore), storeManagerController.createStore)
  .get("/store/:storeId/:nameUnique", storeManagerController.getStoreDetails);

module.exports = router;
