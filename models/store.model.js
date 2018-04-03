module.exports = (sequelize, DataTypes) => {
  const Store = sequelize.define(
    "Store",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING
      },
      name_unique: {
        type: DataTypes.STRING,
        unique: true
      },
      description: {
        type: DataTypes.STRING
      },
      address: {
        type: DataTypes.STRING,
        require: true
      }
    },
    {
      // customize default
      timestamps: true, // add attributes updateAt createAt
      undersored: true, // m?c d?nh camelcase stype --> underscore style
      freezeTableName: true, // m?c d?nh tên table s? là s? nhi?u --> k dùng s? nhi?u
      tableName: "store"
    }
  );

  Store.associate = models => {
    models.Store.belongsTo(models.User, {
      foreignKey: "owner_id",
      as: "owner"
    });

    // models.Store.belongsToMany(models.User, {
    //   as: "users",
    //   through: models.UserStore,
    //   foreignKey: "store_id"
    // });

    models.Store.hasMany(models.UserStore, {
      as: "users",
      foreignKey: "store_id"
    });
  };
  return Store;
};
