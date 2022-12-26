const { StatusCodes } = require("http-status-codes");


// ERROR --> in built class 
class AppErrors extends Error {

   // default prop 
  constructor(
    name = "AppError",
    message = "Something Went Wrong",
    explaination = "Something Went Wrong",
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR
  ) {
    super();
    (this.name = name),
      (this.message = message),
      (this.explaination = explaination),
      (this.statusCode = statusCode);
  }
}

module.exports = AppErrors;
