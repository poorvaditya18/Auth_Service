const express = require("express");
const bodyParser = require("body-parser");
const { PORT } = require("./config/serverConfig");

const apiRoutes = require("./routes/index");

// const db = require("./models/index");
// const UserService = require("./services/user-service");

// const { User, Role } = require("./models/index");

const app = express();

const prepareAndStartServer = () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  //route
  app.use("/api", apiRoutes);

  app.listen(PORT, async () => {
    console.log(`Server started on ${PORT}`);

    if (process.env.DB_SYNC) {
      db.sequelize.sync({ alter: true });
    }

    // const u1 = await User.findByPk(4);
    // const r1 = await Role.findByPk(1);
    // // u1.addRole(r1);
    // const response = await u1.hasRole(1);
    // console.log(response);

    // const service = new UserService();
    // // const newToken = service.createToken({ email: "adi@admin.com", id: 1 });
    // // console.log("new Token is ", newToken);
    // const token =
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkaUBhZG1pbi5jb20iLCJpZCI6MSwiaWF0IjoxNjcxODYxOTU5LCJleHAiOjE2NzE4NjU1NTl9.nEgFz5rc0mDXMtsNV7qcLmBzlr9kVZDVRduDABLLLwc";
    // const response = service.verifyToken(token);
    // console.log(response);
  });
};

prepareAndStartServer();
