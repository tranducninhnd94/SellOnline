"use strict";
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__dirname);
const env = process.env.NODE_ENV || "development";
const config = require("../config/database.config")[env];
const db = {};

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config.options);
}

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return file.indexOf(".") != 0 && file !== basename && file.slice(-3) === ".js" && file.indexOf("index.js") == -1;
//   })
//   .forEach(file => {
//     let model = sequelize["import"](path.join(__dirname, file));
//     db[model.name] = model;
//   });

fs.readdirSync(__dirname).filter(folder => {
  console.log("folder : ", path.join(__dirname, folder));
  let dir = path.join(__dirname, folder);
  if (folder != "index.js")
    fs
      .readdirSync(dir)
      .filter(file => {
        return file;
      })
      .forEach(file => {
        let model = sequelize["import"](path.join(dir, file));
        db[model.name] = model;
      });
});

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
