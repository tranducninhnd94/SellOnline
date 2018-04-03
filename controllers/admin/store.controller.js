"use strict";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt-nodejs");
const UserService = require("../../service/user.service");
const StoreService = require("../../service/store.service");

const StoreDTO = require("../../dto/store.dto");

const StandardResponse = require("../../dto/standard.response");
const SuccessResponse = StandardResponse.SuccessResponse;
const ErrorResponse = StandardResponse.ErrorResponse;

const storeService = new StoreService();

class StoreController {
  createStore(req, res, next) {
    let userInfo = req.user;
    let storeCreate = new StoreDTO();
    storeCreate.setInfoCreate(req.body);

    storeService.findByName(storeCreate.name).then(rs1 => {
      if (rs1) {
        res.status(400);
        let errorResponse = new ErrorResponse(400, `${storeInfo.name} is existed`, "store name is existed");
        return res.json(errorResponse);
      } else {
        storeService.findByNameUnique(storeCreate.name_unique).then(rs2 => {
          if (rs2) {
            res.status(400);
            let errorResponse = new ErrorResponse(400, `${storeInfo.name_unique} is existed`, "store name_unique is existed");
            return res.json(errorResponse);
          }
          storeService
            .createStore(userInfo, storeCreate)
            .then(result => {
              res.status(200);
              let storeResponse = new StoreDTO();
              storeResponse.setInfoResponse(result);
              let successResponse = new SuccessResponse(200, "SUCCESS", storeResponse);
              return res.json(successResponse);
            })
            .catch(error => {
              console.log("error :", error);
              res.status(500);
              let errorResponse = new ErrorResponse(500, "Internal Server", error);
              return res.json(errorResponse);
            });
        }).catch(error => {
          console.log("error :", error);
          res.status(500);
          let errorResponse = new ErrorResponse(500, "Internal Server", error);
          return res.json(errorResponse);
        })
      }
    }).catch(error => {
      console.log("error :", error);
      res.status(500);
      let errorResponse = new ErrorResponse(500, "Internal Server", error);
      return res.json(errorResponse);
    })
  }

  getStoreDetails(req, res, next) {
    let nameUnique = req.params.nameUnique;
    storeService
      .findByNameUnique(nameUnique)
      .then(result => {
        if (result) {
          res.status(200);
          // let storeResponse = new StoreResponse(result);
          // let successResponse = new SuccessResponse(200, "SUCCESS", storeResponse);
          return res.json(result);
        } else {
          res.status(400);
          let errorResponse = new ErrorResponse(400, "Store not exist", "store not exist");
          return res.json(errorResponse);
        }
      })
      .catch(error => {
        console.log("error :", error);
        res.status(500);
        let errorResponse = new ErrorResponse(500, "Internal Server", error);
        return res.json(errorResponse);
      });
  }

  updateStore(req, res, next) { }
}

module.exports = StoreController;
