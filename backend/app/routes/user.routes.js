const {
  authJwt
} = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/test/user/all",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.list
  );

  app.put(
    "/api/test/user/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.update
  );

  app.delete(
    "/api/test/user/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.delete
  );
};
