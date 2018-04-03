const express = require("express");
const router = express.Router();

const validation = require("express-validation");
const entryDataValidate = require("./validation/entry.data.validate");

const StoreController = require("../controllers/admin/store.controller");
const storeController = new StoreController();

const Auth = require("../middleware/auth.middleware");
const auth = new Auth();

router
  .post("/store/create", auth.isLogin, storeController.createStore)
  .get("/store/:nameUnique", storeController.getStoreDetails);

module.exports = router;
