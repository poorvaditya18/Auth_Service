const dotenv = require("dotenv");

const bcrypt = require("bcrypt");

// this will call our env file
dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  SALT: bcrypt.genSaltSync(10),
};
