const UserService = require("../services/user-service");

const userService = new UserService();

const create = async (req, res) => {
  try {
    // parsing the request
    const response = await userService.create({
      email: req.body.email,
      password: req.body.password,
    });
    return res.status(201).json({
      success: true,
      message: "successfully created new user",
      data: response,
      error: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      data: {},
      success: false,
      err: error,
    });
  }
};

const signIn = async (req, res) => {
  try {
    const response = await userService.signIn(
      req.body.email,
      req.body.password
    );
    return res.status(200).json({
      success: true,
      message: "successfully signedIN ",
      data: response,
      error: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      data: {},
      success: false,
      err: error,
    });
  }
};

// Now -> how do we check ?
// Incoming request is authenticated request or not
// Frontend has saved the token .. it will send the JWT token in the header.
// So from header we will fetch and then check whether it is valid token or not.
const isAuthenticated = async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    // const isVerified = userService.verifyToken(token); // {email:'',id:'',iat:'',exp:''}
    // //suppose token that belongs to email .. user itself got deleted .. then in that case we should not check for that token

    const response = await userService.isAuthenticated(token);
    return res.status(200).json({
      success: true,
      message: "User is authenticated and token is valid ",
      data: response,
      error: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      data: {},
      success: false,
      err: error,
    });
  }
};


// check for admin role
const isAdmin = async (req, res) => {
  try {
    const response = await userService.isAdmin(req.body.id);
    return res.status(200).json({
      success: true,
      message: "Successfully fetched whether user is admin or not",
      data: response,
      error: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      data: {},
      success: false,
      err: error,
    });
  }
};

module.exports = {
  create,
  signIn,
  isAuthenticated,
  isAdmin,
};
