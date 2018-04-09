"use strict";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt-nodejs");
const UserService = require("../../../service/user.service");
const StoreService = require("../../../service/store.service");

const StoreDTO = require("../../../dto/store.dto");

const StandardResponse = require("../../../common/standard.response");
const SuccessResponse = StandardResponse.SuccessResponse;
const ErrorResponse = StandardResponse.ErrorResponse;

const storeService = new StoreService();

class StoreManagerController {
  createStore(req, res, next) {
    let userInfo = req.user;
    let _body = req.body;
    let newStore = new StoreDTO();
    newStore.setInfoCreate(_body);

    let bannerImages = _body.bannerImages;
    let types = _body.types;

    Promise.all(
      [storeService.findByName(_body.name), storeService.findByNameUnique(_body.name_unique)]
      // storeService.updateStore(_body)
    )
      .then(value => {
        if (value[0]) {
          res.status(400);
          let errorResponse = new ErrorResponse(400, `${_body.name} is existed`, "store name is existed");
          return res.json(errorResponse);
        }
        if (value[1]) {
          res.status(400);
          let errorResponse = new ErrorResponse(400, `${_body.name_unique} is existed`, "store name is existed");
          return res.json(errorResponse);
        }
        if (value[0] == null && value[1] == null) {
          storeService
            .createStore(userInfo, newStore, bannerImages, types)
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
        }
      })
      .catch(error => {
        console.log("error :", error);
        res.status(500);
        let errorResponse = new ErrorResponse(500, "Internal Server", error);
        return res.json(errorResponse);
      });
  }

  updateStore(req, res, next) {
    let storeId = req.params.storeId;
    let name_unique = req.params.nameUnique;
    let _body = req.body;
    let tmp = new StoreDTO();
    tmp.setInfoUpdate();

    let promise = [];

    Promise.all(
      [storeService.findByName(_body.name), storeService.findByNameUnique(_body.name_unique)]
      // storeService.updateStore(_body)
    )
      .then(value => {
        if (value[0] && value[0].id != storeId) {
          res.status(400);
          let errorResponse = new ErrorResponse(400, `${_body.name} is existed`, "store name is existed");
          return res.json(errorResponse);
        }
        if (value[1] && value[1].id != storeId) {
          res.status(400);
          let errorResponse = new ErrorResponse(400, `${_body.name_unique} is existed`, "store name is existed");
          return res.json(errorResponse);
        }
        storeService
          .updateStore(name_unique, _body)
          .then(result => {
            console.log("result :", result);
            let successResponse = new SuccessResponse(200, "SUCCESS", "update store success");
            return res.json(successResponse);
          })
          .catch(error => {
            console.log("error :", error);
            res.status(500);
            let errorResponse = new ErrorResponse(500, "Internal Server", error);
            return res.json(errorResponse);
          });
      })
      .catch(error => {
        console.log("error :", error);
        res.status(500);
        let errorResponse = new ErrorResponse(500, "Internal Server", error);
        return res.json(errorResponse);
      });
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
}

module.exports = StoreManagerController;
