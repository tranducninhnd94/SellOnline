const sequelize = require("sequelize");
const bcrypt = require("bcrypt-nodejs");
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      email: {
        type: DataTypes.STRING,
        unique: true
      },
      password: {
        type: DataTypes.STRING
      },
      fullname: {
        type: DataTypes.STRING,
        require: true
      },
      phone_number: {
        type: DataTypes.STRING,
        require: true
      },
      address: {
        type: DataTypes.STRING,
        require: true
      }
    },
    {
      // customize default
      timestamps: true, // add attributes updateAt createAt
      underscored: true, // m?c d?nh camelcase stype --> underscore style
      freezeTableName: true, // m?c d?nh tên table s? là s? nhi?u --> k dùng s? nhi?u
      tableName: "user"
    }
  );

  User.associate = models => {
    // models.User.belongsToMany(models.Store, {
    //   as: "stores",
    //   through: models.UserStore,
    //   foreignKey: "user_id"
    // });

    models.User.hasMany(models.UserStore, {
      as: "stories",
      foreignKey: "user_id",
      onDelete: "cascade"
    });
  };

  User.hook("beforeCreate", (user, options) => {
    if (user.password) {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(12));
    }
    return Promise.resolve(user);
  });

  return User;
};
