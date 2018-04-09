const models = require("../models/index");
const sequelize = models.sequelize;
const Sequelize = models.Sequelize;
const SequelizeError = require("../common/SequelizeError");
const Op = Sequelize.Op;

const attributesUser = ["id", "email", "fullname", "phone_number", "password", "address", "created_at", "updated_at"];

const attributesRole = ["id", "name"];

const attributesStore = ["id", "name", "name_unique", "description", "owner_id", "created_at", "updated_at"];

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

  getAllUserOfStore(storeId) {
    return models.UserStore.findAll({
      where: { store_id: storeId },
      include: [
        {
          model: models.User,
          as: "user"
        },
        {
          model: models.Role,
          as: "roles",
          through: {
            attributes: []
          }
        }
      ]
    });
  }

  // for user

  updatePassword(newPassword, user) {
    return models.User.update({ password: newPassword }, { where: { email: user.email } });
  }

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
