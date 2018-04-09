var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var jwt = require("jsonwebtoken");
var constants = require("./common/constants");

// db config
var models = require("./models/index");
models.sequelize.query("SET FOREIGN_KEY_CHECKS = 0", { raw: true }).then(function(results) {
  models.sequelize
    .sync({ force: false })
    .then(() => {
      console.log("database init successly");
      // create Role

      // models.Role.destroy({
      //   where: {},
      //   truncate: true
      // }).then(() => {
      //   models.Role.bulkCreate([
      //     {
      //       id: 1,
      //       name: "ADMIN"
      //     },
      //     {
      //       id: 2,
      //       name: "EMPLOYEE"
      //     }
      //   ])
      //     .then(roleRes => {
      //       console.log("Role is created !");
      //     })
      //     .catch(error => {
      //       console.log(error);
      //     });
      // });

      // models.Type.bulkCreate([
      //   {
      //     id: 1,
      //     name: "Type 1"
      //   },
      //   {
      //     id: 2,
      //     name: "Type 2"
      //   }
      // ])
      //   .then(roleRes => {
      //     console.log("type of store is created !");
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   });
      // models.Promotion.bulkCreate([
      //   {
      //     id: 1,
      //     name: "Promotion 1"
      //   },
      //   {
      //     id: 2,
      //     name: "Promotion 2"
      //   }
      // ])
      //   .then(roleRes => {
      //     console.log("Promotion is created !");
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   });
    })
    .catch(error => {
      console.log(error);
    })
    .catch(error => {
      console.log(error);
    });
});

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const EntryMiddleware = require("./middleware/entry.middleware");
const entryMiddleware = new EntryMiddleware();
app.use(entryMiddleware.entry);

//using router
const userRouter = require("./routes/user.router");
const storeRouter = require("./routes/store.router");
const fileRouter = require("./routes/file.router");
const productRouter = require("./routes/product.router");
app.use(userRouter);
app.use(storeRouter);
app.use(fileRouter);
app.use(productRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(require("./middleware/error.middleware"));

module.exports = app;
