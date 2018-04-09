const validation = require("express-validation");

const ValidationError = validation.ValidationError;
module.exports = function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  console.log(err);
  if (err instanceof ValidationError) {
    // customize error
    let status = err.status;
    let errors = err.errors;
    let msg = "";
    if (errors) {
      errors.forEach(el => {
        msg += el["messages"] + "\n";
      });
    }

    let objError = { result: status, message: msg };
    res.status(status);
    return res.json(objError);
    // }if (err instanceof SequelizeUniqueConstraintError){
  } else {
    res.status(err.status || 500);
    return res.json({ error: err });
  }
};
