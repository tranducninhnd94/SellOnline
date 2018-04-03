const express = require("express");
const router = express.Router();

// sử dụng để validate dữ liệu đầu vào
const validation = require("express-validation");
const entryDataValidate = require("./validation/entry.data.validate");

const UserController = require("../controllers/admin/user.controller");
const userController = new UserController();

router
  .post("/user/create", validation(entryDataValidate.createUser), userController.createUser)
  .post("/user/login", validation(entryDataValidate.login), userController.login)
  .post("/user/update", validation(entryDataValidate.updateUser), userController.updateUser);
module.exports = router;
