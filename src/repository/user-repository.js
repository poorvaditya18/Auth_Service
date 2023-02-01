const { User, Role } = require("../models/index");
const ClientError = require("../utils/client-error");
const ValidationError = require("../utils/validation-error");

const { StatusCodes } = require("http-status-codes");

class UserRepository {
  // create user
  async create(data) {
    try {
      const user = await User.create(data);
      return user;
    } catch (error) {
      // console.log(error);
      if (error.name == "SequelizeValidationError") {
        // console.log("Creating new validation error");
        throw new ValidationError(error);
      }
      console.log("Something went wrong on repository layer");
      throw error;
    }
  }

  // delete the user
  async destroy(userID) {
    try {
      await User.destroy({
        where: {
          id: userID,
        },
      });
      return true;
    } catch (error) {
      console.log("Something went wrong on repository layer");
      throw error;
    }
  }

  // get the user based on particular id
  async getById(userId) {
    try {
      const user = await User.findByPk(userId, {
        // this will help to us to filter the user on the basis of attributes . You will only get email and id attributes. not the password
        attributes: ["email", "id"],
      });
      return user;
    } catch (error) {
      console.log("Something went wrong on repository layer");
      throw error;
    }
  }

  // get the user by email
  async getByEmail(userEmail) {
    try {
      const user = await User.findOne({
        where: {
          email: userEmail,
        },
      });
      // console.log(user);
      if (!user) {
        throw new ClientError(
          "AttributeNotFound",
          "Invalid email send in the Request",
          "Please check the email, as there is no record of the email",
          StatusCodes.NOT_FOUND
        );
      }
      return user;
    } catch (error) {
      console.log(error);
      console.log("Something went wrong on repository layer");
      throw error;
    }
  }

  //this will tell whether user have  admin role or not
  async isAdmin(userId) {
    try {
      const user = await User.findByPk(userId);
      const adminRole = await Role.findOne({
        where: {
          name: "ADMIN",
        },
      });
      // check
      return user.hasRole(adminRole);
    } catch (error) {
      console.log("Something went wrong on repository layer");
      throw error;
    }
  }
}

module.exports = UserRepository;
