const {
  verifyJwt
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
    [verifyJwt.verifyToken],
    controller.one
  );

  app.post(
    "/api/room",
    [verifyJwt.verifyToken, verifyJwt.isAdmin],
    controller.create
  );

  app.put(
    "/api/room/:id",
    [verifyJwt.verifyToken, verifyJwt.isAdmin],
    controller.update
  );

  app.delete(
    "/api/room/:id",
    [verifyJwt.verifyToken, verifyJwt.isAdmin],
    controller.delete
  );
};
