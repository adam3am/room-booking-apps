const {
  verifyJwt
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
    "/api/user/all",
    [verifyJwt.verifyToken, verifyJwt.isAdmin],
    controller.list
  );

  app.put(
    "/api/user/:id",
    [verifyJwt.verifyToken, verifyJwt.isAdmin],
    controller.update
  );

  app.delete(
    "/api/user/:id",
    [verifyJwt.verifyToken, verifyJwt.isAdmin],
    controller.delete
  );
};
