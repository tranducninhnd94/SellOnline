module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define(
    "Tag",
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
      // customize default
      timestamps: true, // add attributes updateAt createAt
      underscored: true, // m?c d?nh camelcase stype --> underscore style
      freezeTableName: true, // m?c d?nh tên table s? là s? nhi?u --> k dùng s? nhi?u
      tableName: "tag"
    }
  );

  Tag.associate = models => {
    models.Tag.belongsToMany(models.Product, {
      as: "products",
      through: models.ProductTag,
      foreignKey: "tag_id"
    });
  };
  return Tag;
};
