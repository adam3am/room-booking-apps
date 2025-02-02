const Sequelize = require("sequelize");
const config = require("../config/db.config.js");

const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD, {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.room = require("../models/room.model.js")(sequelize, Sequelize);
db.pictures = require("../models/pictures.model.js")(sequelize, Sequelize);
db.booking = require("../models/booking.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});
db.room.hasMany(db.pictures, {
  foreignKey: "roomId",
  as: "pictures"
});
db.room.hasMany(db.booking, {
  foreignKey: "roomId",
  as: "bookings"
});
db.pictures.belongsTo(db.room, {
  foreignKey: "roomId"
});
db.booking.belongsTo(db.room, {
  foreignKey: "roomId"
});
db.booking.belongsTo(db.user, {
  foreignKey: "userId"
});

db.ROLES = ["user", "admin"];

module.exports = db;
