const models = require("../models/index");
const sequelize = models.sequelize;
const Sequelize = models.Sequelize;
const SequelizeError = require("../common/SequelizeError");
const Op = Sequelize.Op;

class ProductService {
  create(storeId, productReq, arrImagesReq, arrTagsReq, arrPromotionsReq) {
    return sequelize.transaction(t => {
      return models.Store.findById(storeId, { transaction: t }).then(store => {
        return models.Product.create(productReq, { transaction: t }).then(product => {
          return store.setProducts([product], { transaction: t }).then(() => {
            return models.FileUpload.findAll({ where: { [Op.or]: arrImagesReq } }, { transaction: t }).then(
              arrImages => {
                return product.setImages(arrImages, { transaction: t }).then(() => {
                  return models.Tag.findAll({ where: { [Op.or]: arrTagsReq } }, { transaction: t }).then(arrTags => {
                    return product.setTags(arrTags, { transaction: t }).then(() => {
                      return models.Promotion.findAll({ where: { [Op.or]: arrPromotionsReq } }, { transaction: t }).then(arrPromotions => {
                        return product.setPromotions(arrPromotions, { transaction: t }).then(() => {
                          return product;
                        });
                      });
                    });
                  });
                });
              }
            );
          });
        });
      });
    });
  }
}

module.exports = ProductService;
