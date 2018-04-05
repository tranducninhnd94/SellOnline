const constants = require("../common/constants");
const jwt = require("jsonwebtoken");

const StandardResponse = require("../dto/standard.response");
const ErrorResponse = StandardResponse.ErrorResponse;
class EntryMiddleware {
  entry(req, res, next) {
    if (req.headers && req.headers["authorization"] && req.headers["authorization"].split(" ")[0] == "Token") {
      let token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, constants.SECRET, (error, decoded) => {
        // console.log("decoded :", decoded);
        if (error) {
          let errorResponse = new ErrorResponse(403, error.name, error.message);
          return res.status(403).json(errorResponse);
          next();
        } else req.user = decoded;
        next();
      });
    } else {
      req.user = undefined;
      next();
    }
  }
}

module.exports = EntryMiddleware;
