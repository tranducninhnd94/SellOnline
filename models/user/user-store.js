module.exports = (sequelize, DataTypes) => {
  const UserStore = sequelize.define(
    "UserStore",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        unique: "userStoreIndexName"
      },
      store_id: {
        type: DataTypes.INTEGER,
        unique: "userStoreIndexName"
      }
    },
    {
      timestamps: false,
      underscored: true,
      freezeTableName: true,
      tableName: "user_store"
    }
  );

  UserStore.associate = models => {
    models.UserStore.belongsToMany(models.Role, {
      as: "roles",
      through: models.UserStoreRole,
      foreignKey: "user_store_id"
    });

    models.UserStore.belongsTo(models.User, { as: "user" });

    models.UserStore.belongsTo(models.Store, { as: "store" });
  };
  return UserStore;
};
