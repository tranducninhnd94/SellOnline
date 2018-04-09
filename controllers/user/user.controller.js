"use strict";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt-nodejs");
const UserService = require("../../service/user.service");

const constants = require("../../common/constants");

const UserDTO = require("../../dto/user.dto");
const RoleDTO = require("../../dto/role.dto");
const StoreDTO = require("../../dto/store.dto");

const StandardResponse = require("../../common/standard.response");
const SuccessResponse = StandardResponse.SuccessResponse;
const ErrorResponse = StandardResponse.ErrorResponse;

const userService = new UserService();

const SECRET = constants.SECRET;
const EXPIRES_IN = constants.EXPIRES_IN;

const salt = 10;

class UserController {
  createUser(req, res, next) {
    console.log("create user with {}", req.body);
    let objRequest = req.body;
    let userCreate = new UserDTO();
    userCreate.setInfoCreate(objRequest);


    userService
      .createUserV2(userCreate)
      .then(value => {
        let userRes = new UserDTO();
        userRes.setInfoResponse(value);
        let successResponse = new SuccessResponse(200, "Success", userRes);
        res.status(200);
        return res.json(value);
      })
      .catch(error => {
        console.log("error :", error);
        res.status(500);
        let errorResponse = new ErrorResponse(500, "Internal Server", error);
        return res.json(errorResponse);
      });
  }

  updateUser(req, res, next) {
    let email = req.user.email;
    let objRequest = req.body;
    let userUpdate = new UserDTO();
    userUpdate.setInfoUpdate(objRequest);

    userService
      .updateUser(email, userUpdate)
      .then(value => {
        let userRes = new UserDTO();
        userRes.setInfoResponse(value);
        let successResponse = new SuccessResponse(200, "Success", userRes);
        res.status(200);
        return res.json(successResponse);
      })
      .catch(error => {
        res.status(500);
        let errorResponse = new ErrorResponse(500, "Internal Server", error);
        return res.json(errorResponse);
      });
  }

  login(req, res, next) {
    let objReq = req.body;
    let email = objReq.email;
    let password = objReq.password;

    userService
      .findByEmail(email)
      .then(user => {
        if (user) {
          bcrypt.compare(password, user.password, (error, result) => {
            if (error) {
              res.status(500);
              let errorResponse = new ErrorResponse(500, "Internal Server", error);
              return res.json(errorResponse);
            }

            // password is wrong
            if (!result) {
              res.status(400);
              let errorResponse = new ErrorResponse(400, "Password is wrong", "Password is wrong !");
              return res.json(errorResponse);
            }

            // format roles for each store
            let stories = [];
            if (user.stories) {
              user.stories.forEach(element => {
                let store = element.store || {};
                let roles = new Array();
                if (element.roles) {
                  element.roles.forEach(role => {
                    roles.push(role.name);
                  });
                }
                if (store) {
                  let storeInfo = new StoreDTO();
                  storeInfo.setId(store.id);
                  storeInfo.setName(store.name);
                  storeInfo.setNameUnique(store.name_unique);
                  let roleOfStore = { store: storeInfo, roles };
                  stories.push(roleOfStore);
                }
              });
            }

            const payload = {
              email: user.email,
              fullname: user.fullname,
              address: user.address,
              phone_number: user.phone_number,
              stories: stories
            };

            var token = jwt.sign(payload, SECRET, { expiresIn: EXPIRES_IN });
            let successError = new SuccessResponse(200, "SUCCESS", token);
            res.status(200);
            res.json(successError);
          });
        } else {
          res.status(400);
          let errorResponse = new ErrorResponse(400, "Email is wrong", "Email is wrong !");
          return res.json(errorResponse);
        }
      })
      .catch(error => {
        console.log(error);
        let errorResponse = new ErrorResponse(500, "Internal Server");
        res.status(500);
        res.json(errorResponse);
      });
  }

  changePassword(req, res, next) {
    let user = req.user;
    let _body = req.body;
    let passwordReq = _body.password;

    bcrypt.genSalt(constants.SALT, (error, salt) => {
      if (error) {
        console.log(error);
        let errorResponse = new ErrorResponse(500, "Internal Server");
        res.status(500);
        res.json(errorResponse);
      } else {
        bcrypt.hash(passwordReq, salt, null, (error, newPassword) => {
          if (error) {
            console.log(error);
            let errorResponse = new ErrorResponse(500, "Internal Server");
            res.status(500);
            res.json(errorResponse);
          } else {
            userService
              .updatePassword(newPassword, user)
              .then(result => {
                let successError = new SuccessResponse(200, "Success", result);
                res.status(200);
                res.json(successError);
              })
              .catch(error => {
                console.log(error);
                let errorResponse = new ErrorResponse(500, "Internal Server");
                res.status(500);
                res.json(errorResponse);
              });
          }
        });
      }
    });
  }
}
module.exports = UserController;
