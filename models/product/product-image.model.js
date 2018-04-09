module.exports = (sequelize, DataTypes) => {
  const ProductImage = sequelize.define(
    "ProductImage",
    {
      priority: {
        type: DataTypes.TINYINT,
        require: true,
        defaultValue: 0
      }
    },
    {
      timestamps: true,
      underscored: true,
      freezeTableName: true,
      tableName: "product_image"
    }
  );

  return ProductImage;
};
