module.exports = (sequelize, DataTypes) => {
  const FileUpload = sequelize.define(
    "FileUpload",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      path: {
        type: DataTypes.STRING,
        require: true
      },
      size: {
        type: DataTypes.STRING,
        require: true
      },
      mimetype: {
        type: DataTypes.STRING,
        require: true
      },
      originalname: {
        type: DataTypes.STRING,
        require: true
      },
      encoding: {
        type: DataTypes.STRING,
        require: true
      },
      filename: {
        type: DataTypes.STRING,
        require: true
      },
      is_used: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      timestamps: true,
      underscored: true,
      freezeTableName: true,
      tableName: "file_upload"
    }
  );

  FileUpload.associate = models => {
    // store-image-cover
    models.FileUpload.belongsToMany(models.Store, {
      as: "stores",
      through: models.StoreBannerImage,
      foreignKey: "file_upload_id"
    });

    models.FileUpload.belongsToMany(models.Product, {
      as: "products",
      through: models.ProductImage,
      foreignKey: "file_upload_id"
    });
  };

  return FileUpload;
};
