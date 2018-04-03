module.exports = (sequelize, DataTypes) => {
  const UserStoreRole = sequelize.define(
    "UserStoreRole",
    {},
    {
      timestamps: true,
      underscored: true,
      freezeTableName: true,
      tableName: "user_store_role"
    }
  );

  return UserStoreRole;
};
