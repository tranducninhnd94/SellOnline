module.exports = (sequelize, DataTypes) => {
  const StoreType = sequelize.define(
    "StoreType",
    {},
    {
      timestamps: true,
      underscored: true,
      freezeTableName: true,
      tableName: "store_type"
    }
  );

  return StoreType;
};
