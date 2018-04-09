"use strict";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt-nodejs");
const UserService = require("../../../service/user.service");

const constants = require("../../../common/constants");

const UserDTO = require("../../../dto/user.dto");
const RoleDTO = require("../../../dto/role.dto");
const StoreDTO = require("../../../dto/store.dto");

const StandardResponse = require("../../../common/standard.response");
const SuccessResponse = StandardResponse.SuccessResponse;
const ErrorResponse = StandardResponse.ErrorResponse;

const userService = new UserService();

const SECRET = constants.SECRET;
const EXPIRES_IN = constants.EXPIRES_IN;

class UserManagerController {
  updateRoleOfUser(req, res, next) {
    let objReq = req.body;
    let storeId = objReq.storeId;
    let userId = objReq.userId;
    let roles = objReq.roles;
    let rolesUpdate = new Array();
    roles.forEach(tmp => {
      // don't use model DTO
      rolesUpdate.push(tmp);
    });

    userService
      .updateRoles(storeId, userId, rolesUpdate)
      .then(result => {
        console.log("result: ", JSON.stringify(result));
        let objectSuccess = new SuccessResponse(200, "Success", "Update role for user");
        res.status(200);
        return res.json(objectSuccess);
      })
      .catch(error => {
        console.log("error :", error);
        res.status(500);
        let errorResponse = new ErrorResponse(500, "Internal Server", error);
        return res.json(errorResponse);
      });
  }

  getAllUserOfStore(req, res, next) {
    let storeId = req.params.storeId;
    userService
      .getAllUserOfStore(storeId)
      .then(result => {
        console.log("result: ", JSON.stringify(result));

        let usersResponse = new Array();

        if (result) {
          result.forEach(tmp => {
            let user = tmp.user;
            let roles = tmp.roles;
            let userRespone = new UserDTO();
            userRespone.setInfoResponse(user);
            userRespone.setRoles(roles);
            usersResponse.push(userRespone);
          });
        }

        let objectSuccess = new SuccessResponse(200, "Success", usersResponse);
        res.status(200);
        return res.json(objectSuccess);
      })
      .catch(error => {
        console.log("error :", error);
        res.status(500);
        let errorResponse = new ErrorResponse(500, "Internal Server", error);
        return res.json(errorResponse);
      });
  }
}
module.exports = UserManagerController;
