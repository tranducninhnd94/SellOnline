const models = require("../models/index");
const sequelize = models.sequelize;
const Sequelize = models.Sequelize;
const SequelizeError = require("../common/SequelizeError");
const Op = Sequelize.Op;

const attributesStore = ["id", "name", "name_unique", "description", "owner_id", "created_at", "updated_at"];

const attributesUser = ["id", "email", "fullname", "phone_number", "password", "address", "created_at", "updated_at"];

const attributesRole = ["id", "name"];

class StoreService {
  // for admin
  updateStore(nameUnique, infoUpdate) {
    return models.Store.update(infoUpdate, { where: { name_unique: nameUnique } });
  }

  createStore(userInfo, storeInfo, bannerImages, typesInfo) {
    return new Promise((resolve, reject) => {
      return sequelize
        .transaction(t => {
          return models.User.findOne({ where: { email: userInfo.email } }, { transaction: t }).then(user => {
            return models.Store.create(storeInfo, { transaction: t }).then(store => {
              return store.setOwner(user, { transaction: t }).then(() => {
                return models.UserStore.create({}, { transaction: t }).then(userStore => {
                  return userStore.setUser(user, { transaction: t }).then(() => {
                    return userStore.setStore(store, { transaction: t }).then(() => {
                      return models.Role.findOne({ where: { name: "ADMIN" } }, { transaction: t }).then(role => {
                        return userStore.setRoles([role], { transaction: t }).then(() => {
                          // create banner-image
                          return models.FileUpload.findAll(
                            { where: { [Op.or]: bannerImages } },
                            { transaction: t }
                          ).then(files => {
                            return store.setBannerImages(files, { transaction: t }).then(() => {
                              // create type
                              return models.Type.findAll({ where: { [Op.or]: typesInfo } }, { transaction: t }).then(
                                types => {
                                  return store.setTypes(types, { transaction: t }).then(() => {
                                    return store;
                                  });
                                }
                              );
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        })
        .then(result => {
          return resolve(result);
        })
        .catch(error => {
          return reject(error);
        });
    });
  }

  findByNameUnique(nameUnique) {
    return models.Store.findOne({ where: { name_unique: nameUnique } });
  }

  findByName(name) {
    return models.Store.findOne({ where: { name } });
  }
}

module.exports = StoreService;
