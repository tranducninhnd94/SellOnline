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
            default: false
        },
      },
      {
        timestamps: true,
        underscored: true,
        freezeTableName: true,
        tableName: "file_upload"
      }
    );
  
    return FileUpload;
  };
  