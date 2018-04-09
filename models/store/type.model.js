module.exports = (sequelize, DataTypes) => {
  const Type = sequelize.define(
    "Type",
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
      tableName: "type"
    }
  );

  Type.associate = models => {
    models.Type.belongsToMany(models.Store, {
      as: "stores",
      through: models.StoreType,
      foreignKey: "type_id"
    });
  };
  return Type;
};
