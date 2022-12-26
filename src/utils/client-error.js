const AppErrors = require("./error-handler");
const { StatusCodes } = require("http-status-codes");


class ClientError extends AppErrors {
  constructor(name, message, explaination, statusCode) {
    super(name, message, explaination, statusCode);
  }
}

module.exports = ClientError;
