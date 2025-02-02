const db = require("../models");

const {
  ROLES
} = db;
const User = db.user;

checkDuplicateUsers = (req, res, next) => {
  // Username
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {

    if (user) {
      res.status(400).send({
        message: "Failed! username already exists"
      });
      return;
    }

    // Email
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(userr => {

      if (userr) {
        res.status(400).send({
          message: "Failed! Email is already exists!"
        });
        return;
      }

      next();
    });
  });
};

checkRoles = (req, res, next) => {

  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {

      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Failed! Role does not exist = ${  req.body.roles[i]}`
        });
        return;
      }
    }
  }

  next();
};

const checkSignUp = {
  checkDuplicateUsers,
  checkRoles
};

module.exports = checkSignUp;
