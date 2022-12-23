const { User } = require("../models/index");

class UserRepository {
  // create user
  async create(data) {
    try {
      const user = await User.create(data);
      return user;
    } catch (error) {
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
        attributes: ["email", "id"],
      });
      return user;
    } catch (error) {
      console.log("Something went wrong on repository layer");
      throw error;
    }
  }
}

module.exports = UserRepository;