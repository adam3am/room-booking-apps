const {
  verifyJwt
} = require("../middleware");
const controller = require("../controllers/booking.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/booking",
    [verifyJwt.verifyToken],
    controller.create
  );

  app.get(
    "/api/booking/all",
    [verifyJwt.verifyToken],
    controller.list
  );
};
