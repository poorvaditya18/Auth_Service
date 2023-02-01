const UserRepository = require("../repository/user-repository");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../config/serverConfig");
const AppErrors = require("../utils/error-handler");
const { AUTH_USER, AUTH_PASS } = require("../config/serverConfig");
const nodemailer = require("nodemailer");
class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(data) {
    try {
      const user = await this.userRepository.create(data);
      return user;
    } catch (error) {
      if (error.name == "SequelizeValidationError") {
        throw error;
      }
      // console.log("Something went wrong in the service layer");
      // throw new AppErrors(
      //   "ServerError",
      //   "Something went wrong in the service layer",
      //   "Logical issue found",
      //   500
      // );
      throw error;
    }
  }

  async signIn(email, plainPassword) {
    try {
      // step 1 -> fetch the user using email
      const user = await this.userRepository.getByEmail(email);
      // step 2 -> compare incoming plain password with stored encrypted password
      const passwordMatch = this.checkPassword(plainPassword, user.password);
      if (!passwordMatch) {
        console.log("Password doesn't match");
        throw { error: "Incorrect Password" };
      }
      // step 3 -> if passwords match then create jwt token and send it to the user
      const newJWT = this.createToken({ email: user.email, id: user.id });
      return newJWT;
    } catch (error) {
      if (error.name == "AttributeNotFound") {
        throw error;
      }
      console.log("Something went wrong in the sign in process");
      throw error;
    }
  }

  async isAuthenticated(token) {
    try {
      const response = this.verifyToken(token);
      if (!response) {
        throw { error: "Invalid Token" };
      }
      const user = await this.userRepository.getById(response.id);
      if (!user) {
        throw { error: "No user with the corresponding token exists" };
      }
      return user.id;
    } catch (error) {
      console.log("Something went wrong in auth process");
      throw error;
    }
  }

  createToken(user) {
    try {
      //token
      const result = jwt.sign(user, JWT_KEY, { expiresIn: "1d" });
      return result;
    } catch (error) {
      console.log("Something went wrong in token creation");
      throw error;
    }
  }

  verifyToken(token) {
    try {
      const response = jwt.verify(token, JWT_KEY);
      return response;
    } catch (error) {
      console.log("Something went wrong in token validation", error);
      throw error;
    }
  }

  checkPassword(userInputPlainPassword, encryptedPassword) {
    try {
      return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
    } catch (error) {
      console.log("Something went wrong in the password comparison");
      throw error;
    }
  }

  isAdmin(userId) {
    try {
      return this.userRepository.isAdmin(userId);
    } catch (error) {
      console.log("Something went wrong in the service layer");
      throw error;
    }
  }

  //user.email , user.id
  // mailGeneration(user, token) {
  //   const transporter = nodemailer.createTransport({
  //     service: "gmail",
  //     auth: {
  //       user: AUTH_USER,
  //       pass: AUTH_PASS,
  //     },
  //   });

  //   const mailConfigurations = {
  //     // It should be a string of sender/server email
  //     from: `${AUTH_USER}`,

  //     to: `${user.email}`,

  //     // Subject of Email
  //     subject: "Email Verification",

  //     // This would be the text of email body
  //     text: `Hi! There, You have recently visited
  //          our website and entered your email.
  //          Please follow the given link to verify your email
  //          http://localhost:3000/verify/${token}
  //          Thanks`,
  //   };

  //   transporter.sendMail(mailConfigurations, function (error, info) {
  //     if (error) throw Error(error);
  //     console.log("Email Sent Successfully");
  //     console.log(info);
  //   });
}

module.exports = UserService;
