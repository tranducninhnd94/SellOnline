const models = require("../models/index");
const sequelize = models.sequelize;
const Sequelize = models.Sequelize;
const SequelizeError = require("../common/SequelizeError");
const Op = Sequelize.Op;

const attributesUser = ["id", "email", "fullname", "phone_number", "password", "address", "createdAt", "updatedAt"];

const attributesRole = ["id", "name"];

const attributesStore = ["id", "name", "name_unique", "description", "owner_id", "createdAt", "updatedAt"];

class UserService {
  createUserV2(userCreate) {
    return models.User.create(userCreate);

    // return new Promise((resolve, reject) => {
    //   return sequelize
    //     .transaction(t => {
    //       return models.User.create(userCreate, { transaction: t }).then(user => {
    //         return models.Role.findAll({ where: { [Op.or]: roleCreate } }, { transaction: t }).then(roles => {
    //           return user.setRoles(roles, { transaction: t });
    //         });
    //       });
    //     })
    //     .then(result => {
    //       return resolve(result);
    //     })
    //     .catch(error => {
    //       return reject(error);
    //     });
    // });
  }

  updateUser(email, userUpdate, rolesUpdate) {
    return new Promise((resolve, reject) => {
      return sequelize
        .transaction(t => {
          return models.User.findOne({ where: { email } }).then(user1 => {
            return user1.update(userUpdate, { transaction: t }).then(user2 => {
              return models.Role.findAll({ where: { [Op.or]: rolesUpdate } }, { transaction: t }).then(roles => {
                return user2.setRoles(roles, { transaction: t });
              });
            });
          });
        })
        .then(result => {
          console.log("result :", result);
          return resolve(result);
        })
        .catch(error => {
          console.log("error : ", error);
          return reject(error);
        });
    });
  }

  findByEmail(email) {
    return models.User.findOne({
      where: { email },
      attributes: attributesUser,
      include: [
        {
          model: models.UserStore,
          as: "stories",
          include: [
            {
              model: models.Store,
              as: "store"
            },
            {
              model: models.Role,
              as: "roles",
              through: {
                attributes: []
              }
            }
          ]
        }
      ]
    });
  }

  findRoleOfUser(userId) {
    return models.UserStore.findAll({
      where: { user_id: userId },
      include: [
        {
          model: models.UserStore,
          as: "storiesUser"
        }
      ]
    });
  }
}

module.exports = UserService;
