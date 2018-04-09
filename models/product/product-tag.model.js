module.exports = (sequelize, DataTypes) => {
  const ProductTag = sequelize.define(
    "ProductTag",
    {},
    {
      timestamps: true,
      underscored: true,
      freezeTableName: true,
      tableName: "product_tag"
    }
  );

  return ProductTag;
};
