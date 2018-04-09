module.exports = (sequelize, DataTypes) => {
  const StoreBannerImage = sequelize.define(
    "StoreBannerImage",
    {},
    {
      timestamps: true,
      underscored: true,
      freezeTableName: true,
      tableName: "store_banner_image"
    }
  );

  return StoreBannerImage;
};
