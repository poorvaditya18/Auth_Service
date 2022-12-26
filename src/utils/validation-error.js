const AppErrors = require("./error-handler");
const { StatusCodes } = require("http-status-codes");


class ValidationError extends AppErrors {
  constructor(error) {
    // parsing the error

    let errorName = error.name;
    let explaination = [];

    error.errors.forEach((err) => {
      explaination.push(err.message);
    });

    super(
      errorName,
      "Not able to Validate the data sent in the Request",
      explaination,
      StatusCodes.BAD_REQUEST
    );
  }
}

module.exports = ValidationError;
