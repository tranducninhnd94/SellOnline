const models = require("../models/index");
const sequelize = models.sequelize;
const Sequelize = models.Sequelize;
const SequelizeError = require("../common/SequelizeError");
const Op = Sequelize.Op;

const attributesUser = ["id", "email", "fullname", "phone_number", "password", "address", "createdAt", "updatedAt"];

const attributesRole = ["id", "name"];

const attributesStore = ["id", "name", "name_unique", "description", "owner_id", "createdAt", "updatedAt"];

class UserService {
  // for user
  createUserV2(userCreate) {
    return models.User.create(userCreate);
  }

  // for admin
  updateRoles(storeId, userId, rolesUpdate) {
    return sequelize.transaction(t => {
      return models.UserStore.findOne({ where: { store_id: storeId, user_id: userId } }, { transaction: t }).then(
        userStore => {
          if (userStore) {
            return models.Role.findAll(
              {
                where: {
                  [Op.or]: rolesUpdate
                }
              },
              { transaction: t }
            ).then(roles => {
              return userStore.setRoles(roles, { transaction: t });
            });
          } else {
            return models.UserStore.create({ user_id: userId, store_id: storeId }, { transaction: t }).then(
              userStore => {
                return models.Role.findAll({ where: { [Op.or]: rolesUpdate } }, { transaction: t }).then(roles => {
                  return userStore.setRoles(roles, { transaction: t });
                });
              }
            );
          }
        }
      );
    });
  }

  // for user
  updateUser(email, userUpdate) {
    return models.User.findOne({ where: { email } }).then(user => {
      return user.update(userUpdate);
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
}

module.exports = UserService;
