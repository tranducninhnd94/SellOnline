"use strict";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt-nodejs");

const StoreDTO = require("../../../dto/store.dto");
const ProductDTO = require("../../../dto/product.dto");
const FileUplaod = require("../../../dto/file-upload.dto");
const PromotionDTO = require("../../../dto/promotion.dto")

const StandardResponse = require("../../../common/standard.response");
const SuccessResponse = StandardResponse.SuccessResponse;
const ErrorResponse = StandardResponse.ErrorResponse;

const ProductService = require("../../../service/product.service");
const productService = new ProductService();

class ProductManagerController {
  createProduct(req, res, next) {
    let storeId = req.params.storeId;
    let _body = req.body;
    // set information for product
    let productReq = new ProductDTO();
    productReq.id = _body.id;
    productReq.name = _body.name;
    productReq.original_price = _body.original_price;
    productReq.sale_price = _body.sale_price;
    productReq.description = _body.description;

    // set information for file-upload
    let arrImagesReq = new Array();
    if (_body.images) {
      _body.images.forEach(tmp => {
        let image = new FileUplaod();
        image.id = tmp.id;
        image.originalname = tmp.originalname;
        arrImagesReq.push(image);
      });
    }

    // set information for tags
    let arrTagsReq = new Array();
    if (_body.tags) {
      _body.tags.forEach(tmp => {
        let tag = new tag();
        tag.id = tmp.id;
        tag.name = tmp.name;
        arrTagsReq.push(tag);
      });
    }

    // set information for promotions
    let arrPromotionsReq = new Array();
    if (_body.promotions) {
      _body.promotions.forEach(tmp => {
        let promotion = new PromotionDTO();
        promotion.Id = tmp.id;
        promotion.Name = tmp.name;
        arrPromotionsReq.push(promotion);
      });
    }

    // call service
    productService
      .create(storeId, productReq, arrImagesReq, arrTagsReq, arrPromotionsReq)
      .then(result => {
        res.status(200);
        let successResponse = new SuccessResponse(200, "SUCCESS", result);
        return res.json(successResponse);
      })
      .catch(error => {
        console.log("error :", error);
        res.status(500);
        let errorResponse = new ErrorResponse(500, "Internal Server", error);
        return res.json(errorResponse);
      });
  }
}

module.exports = ProductManagerController;
