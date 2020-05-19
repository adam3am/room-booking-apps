const db = require("../models");

const pictures_room_model = db.pictures;
const bookings_room_model = db.booking;

exports.one = function (req, res) {
  const id = parseInt(req.params.id);

  if (Number.isInteger(id) == false) {
    return res.status(400).send('id should be integer');
  }
  return db.room
    .findByPk(id, {
      include: [{
          model: pictures_room_model,
          as: 'pictures'
        },
        {
          model: bookings_room_model,
          as: 'bookings'
        }
      ]
    })
    .then(room => {

      if (!room) {
        return res.status(400).send('room not found');
      }
      return res.status(200).send(room);

    })
    .catch(error => {
      return res.status(400).send(error);
    });
};

exports.list = function (req, res) {
  return db.room
    .findAll({
      include: [{
        model: pictures_room_model,
        as: 'pictures'
      }]
    })
    .then(rooms => {
      return res.status(200).send(rooms);
    })
    .catch(error => {
      return res.status(400).send(error);
    });
};

exports.create = function (req, res) {
  const {
    name,
    description,
    capacity,
    assets
  } = req.body;

  if (
    name == null ||
    description == null ||
    capacity == null ||
    assets == null
  ) {
    return res.status(400).send('name,description or capacity are null');
  }
  db.room
    .findAll({
      where: {
        name
      }
    })
    .then(result => {

      if (result.length != 0) {
        return res.status(400).send('room name already exists');
      }
      let {
        pictures
      } = req.body;

      if (pictures == null) {
        pictures = {
          url: ''
        };
      }
      return db.room
        .create({
          name,
          description,
          capacity,
          assets,
          pictures
        }, {
          include: [{
            model: pictures_room_model,
            as: 'pictures'
          }]
        })
        .then(room => {
          return res.status(201).send(room);
        })
        .catch(err => {
          console.log('error trying to add new  room: ', JSON.stringify(err));
          return res.status(400).send(err);
        });

    });
};

exports.update = function (req, res) {
  const id = parseInt(req.params.id);

  if (Number.isInteger(id) == false) {
    return res.status(400).send('id parameter should be an integer');
  }

  db.room
    .findByPk(id)
    .then(room => {
      const {
        name,
        description,
        capacity,
        assets
      } = req.body;
      room
        .update({
          name,
          description,
          capacity,
          assets
        })
        .then(user => {
          return res.status(201).send(user);
        })
        .catch(err => {
          console.log('Error updating room', JSON.stringify(err));
          return res.status(400).send(err);
        });
    })
};

exports.delete = function (req, res) {
  const id = parseInt(req.params.id);

  if (Number.isInteger(id) == false) {
    return res.status(400).send('id parameter should be an integer');
  }

  db.room.findByPk(id).then(room => {

    if (!room) {
      return res.status(400).send('room not found');
    }
    room
      .destroy(room)
      .then(() => {
        return res.status(201).send('Success deleting room');
      })
      .catch(err => {
        console.log('Error deleting room', JSON.stringify(err));
        return res.status(400).send(err);
      });
  });
};
