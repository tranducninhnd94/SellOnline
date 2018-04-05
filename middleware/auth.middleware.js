const jwt = require("jsonwebtoken");
const standardResponse = require("../dto/standard.response");
const ErrorResponse = standardResponse.ErrorResponse;
class Auth {
  isLogin(req, res, next) {
    if (req.user) next();
    else {
      res.status(403);
      let error = new ErrorResponse(403, "FORBIDDEN_TO_ACCESS", "Token expired or not exist");
      return res.json(error);
    }
  }

  isAdmin(req, res, next) {
    let storeId = req.params.storeId;
    let nameUnique = req.params.nameUnique;
    let isPass = false;
    if (req.user) {
      let user = req.user;
      let stories = user.stories;
      if (stories) {
        stories.forEach(tmp => {
          let store = tmp.store;
          let roles = tmp.roles;
          if (store.id == storeId) {
            if (roles) {
              roles.forEach(role => {
                if (role == "ADMIN") {
                  isPass = true;
                  next();
                }
              });
            }
          }
        });
        if (!isPass) {
          res.status(403);
          let error = new ErrorResponse(403, "FORBIDDEN_TO_ACCESS", "You are not Admin");
          return res.json(error);
        }
      } else {
        res.status(403);
        let error = new ErrorResponse(403, "FORBIDDEN_TO_ACCESS", "You are not Admin");
        return res.json(error);
      }
    } else {
      res.status(403);
      let error = new ErrorResponse(403, "FORBIDDEN_TO_ACCESS", "You are not Admin");
      return res.json(error);
    }
  }

  isEmployee(req, res, next) {
    let nameUnique = req.params.nameUnique;
    if (req.user) {
      let user = req.user;
      let stories = user.stories;
      if (stories) {
        stories.forEach(store => {
          if (store.id == storeId) {
            let roles = store.roles;
            if (roles) {
              roles.forEach(role => {
                if (role == "ADMIN" || role == "EMPLOYEE") {
                  next();
                }
              });
            }
          }
        });
        res.status(403);
        let error = new ErrorResponse(403, "FORBIDDEN_TO_ACCESS", "You are not Admin or Employee");
        return res.json(error);
      } else {
        res.status(403);
        let error = new ErrorResponse(403, "FORBIDDEN_TO_ACCESS", "You are not Admin or Employee");
        return res.json(error);
      }
    } else {
      res.status(403);
      let error = new ErrorResponse(403, "FORBIDDEN_TO_ACCESS", "You are not Admin or Employee");
      return res.json(error);
    }
  }
}

module.exports = Auth;
