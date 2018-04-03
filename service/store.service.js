const models = require("../models/index");
const sequelize = models.sequelize;
const Sequelize = models.Sequelize;
const SequelizeError = require("../common/SequelizeError");
const Op = Sequelize.Op;

const attributesStore = ["id", "name", "name_unique", "description", "owner_id", "createdAt", "updatedAt"];

const attributesUser = ["id", "email", "fullname", "phone_number", "password", "address", "createdAt", "updatedAt"];

const attributesRole = ["id", "name"];

class StoreService {
  createStore(userInfo, storeInfo) {
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
                          return store;
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
    return models.Store.findOne({
      where: { name_unique: nameUnique },
      attributes: attributesStore,
      include: [
        {
          model: models.User,
          as: "users",
          attributes: attributesUser,
          through: {
            attributes: []
          },
          include: [
            {
              model: models.Role,
              as: "roles",
              attributes: attributesRole,
              through: { attributes: [] }
            }
          ]
        },
        {
          model: models.User,
          as: "owner"
        }
      ]
    });
  }

  findByNameUnique(nameUnique) {
    return models.Store.findOne({ where: { name_unique: nameUnique } });
  }

  findByName(name) {
    return models.Store.findOne({ where: { name } });
  }

  updateStore() {}
}

module.exports = StoreService;
