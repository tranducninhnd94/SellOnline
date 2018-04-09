module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING
      },
      original_price: {
        type: DataTypes.FLOAT,
        require: true
      },
      sale_price: {
        type: DataTypes.FLOAT,
        require: true
      },
      description: {
        type: DataTypes.STRING
      }
    },
    {
      timestamps: true,
      underscored: true,
      freezeTableName: true,
      tableName: "product"
    }
  );

  Product.associate = models => {
    models.Product.belongsToMany(models.Tag, {
      as: "tags",
      through: models.ProductTag,
      foreignKey: "product_id"
    });

    models.Product.belongsToMany(models.Promotion, {
      as: "promotions",
      through: models.ProductPromotion,
      foreignKey: "product_id"
    });

    models.Product.belongsToMany(models.FileUpload, {
      as: "images",
      through: models.ProductImage,
      foreignKey: "product_id"
    });

    models.Product.belongsTo(models.Store, {
      as: "store"
    });
  };
  return Product;
};
