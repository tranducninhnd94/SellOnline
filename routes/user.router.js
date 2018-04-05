const express = require("express");
const router = express.Router();

// sử dụng để validate dữ liệu đầu vào
const validation = require("express-validation");
const entryDataValidate = require("./validation/entry.data.validate");

const UserManagerController = require("../controllers/user/admin/user-manager.controller");
const userManagerController = new UserManagerController();

const UserController = require("../controllers/user/user.controller");
const userController = new UserController();

const Auth = require("../middleware/auth.middleware");
const auth = new Auth();
router
  //user
  .post("/user/create", validation(entryDataValidate.createUser), userController.createUser)
  .post("/user/login", validation(entryDataValidate.login), userController.login)
  //admin
  .post("/user/update", validation(entryDataValidate.updateUser), auth.isLogin, userController.updateUser)
  .post(
    "/admin/store/:storeId/:nameUnique/user/role/update",
    validation(entryDataValidate.updateRoleOfUser),
    auth.isAdmin,
    userManagerController.updateRoleOfUser
  );
module.exports = router;
