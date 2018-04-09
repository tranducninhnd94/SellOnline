module.exports = (sequelize, DataTypes) => {
  const Promotion = sequelize.define(
    "Promotion",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING
      },
      description: {
        type: DataTypes.STRING
      }
    },
    {
      timestamps: true,
      underscored: true,
      freezeTableName: true,
      tableName: "promotion"
    }
  );

  Promotion.associate = models => {
    models.Promotion.belongsToMany(models.Product, {
      as: "products",
      through: models.ProductPromotion,
      foreignKey: "promotion_id"
    });
  };
  return Promotion;
};
