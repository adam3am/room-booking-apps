const {
  authJwt
} = require("../middleware");
const controller = require("../controllers/room.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/room/all",
    controller.list
  );

  app.get(
    "/api/room/:id",
    [authJwt.verifyToken],
    controller.one
  );

  app.post(
    "/api/room",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.create
  );

  app.put(
    "/api/room/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.update
  );

  app.delete(
    "/api/room/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.delete
  );
};
