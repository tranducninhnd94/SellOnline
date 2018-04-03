module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    "Role",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING
      }
    },
    {
      timestamps: false,
      underscored: true,
      freezeTableName: true,
      tableName: "role"
    }
  );

  Role.associate = models => {
    // models.Role.belongsToMany(models.UserStore, {
    //   as: "usersStore",
    //   through: models.UserStoreRole,
    //   foreignKey: "role_id"
    // });
    models.Role.belongsToMany(models.UserStore, {
      as: "usersStore",
      through: models.UserStoreRole,
      foreignKey: "role_id"
    });
  };

  return Role;
};
