module.exports = (sequelize, DataTypes) => {
  const ProductPromotion = sequelize.define(
    "ProductPromotion",
    {
      start_date: {
        type: DataTypes.DATE,
        require: true
      },

      end_date: {
        type: DataTypes.DATE,
        require: true
      }
    },
    {
      timestamps: true,
      underscored: true,
      freezeTableName: true,
      tableName: "product_promotion"
    }
  );

  return ProductPromotion;
};
