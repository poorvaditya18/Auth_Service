const dotenv = require("dotenv");

// this will call our env file
dotenv.config();

module.exports = {
  PORT: process.env.PORT,
};
