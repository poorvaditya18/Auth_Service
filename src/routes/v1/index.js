const express = require("express");

const UserController = require("../../controllers/user-controller");

const { AuthRequestValidators } = require("../../middlewares/index");

const router = express.Router();

//signUp for user
router.post(
  "/signup",
  AuthRequestValidators.validateUserAuth,
  UserController.create
);

// signIn  - > will have "post" request as whenever you are sending details you are generating new token
router.post(
  "/signin",
  AuthRequestValidators.validateUserAuth,
  UserController.signIn
);

//getUser
router.get("/isAuthenticated", UserController.isAuthenticated);

//check admin
router.get(
  "/isAdmin",
  AuthRequestValidators.validateIsAdminRequest,
  UserController.isAdmin
);

module.exports = router;
