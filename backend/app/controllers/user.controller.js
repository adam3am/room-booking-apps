const db = require("../models");

const User = db.user;
const Role = db.role;

exports.list = function (req, res) {
  return User
    .findAll({
      attributes: {
        exclude: ['password']
      },
      include: [{
        model: Role
      }]
    })
    .then(users => {
      return res.status(200).send(users);
    })
    .catch(error => {
      return res.status(400).send(error);
    });
};

exports.update = function (req, res) {
  const id = parseInt(req.params.id);

  if (Number.isInteger(id) == false) {
    return res.status(400).send('id parameter should be an integer');
  }

  db.user
    .findByPk(id, {
      attributes: {
        exclude: ['password']
      }
    })
    .then(user => {
      const {
        username,
        email
      } = req.body;
      user
        .update({
          username,
          email
        })
        .then((user) => {
          return res.status(201).send(user);
        })
        .catch(err => {
          console.log('Error updating user', JSON.stringify(err));
          return res.status(400).send(err);
        });
    })
};

exports.delete = function (req, res) {
  const id = parseInt(req.params.id);

  if (Number.isInteger(id) == false) {
    return res.status(400).send('id parameter should be an integer');
  }

  db.user.findByPk(id).then(user => {

    if (!user) {
      return res.status(400).send('user not found');
    }
    user
      .destroy(user)
      .then(() => {
        return res.status(201).send('Success deleting user');
      })
      .catch(err => {
        console.log('Error deleting user', JSON.stringify(err));
        return res.status(400).send(err);
      });
  });
}
