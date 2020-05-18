const db = require("../models");

const bookings_room_model = db.booking;

exports.create = function (req, res) {
  const {
    userId,
    roomId,
    booking_title,
    booking_description,
    date
  } = req.body;

  if (
    userId == null ||
    roomId == null ||
    booking_title == null ||
    (booking_description == null) | (date == null)
  ) {
    return res.status(400).send('some values are null');
  }
  date_hour = date.split(':')[1];
  date_hour_minutes = date_hour

  if (!(date_hour_minutes == 30 || date_hour_minutes == 00)) {
    return res.status(400).send({
      message: "Sudah Di-Book. Pilih Waktu Lain"
    });
  }
  db.booking
    .findAll({
      where: {
        roomId: roomId,
        date: date
      }
    })
    .then(result => {

      if (result.length != 0) {
        return res
          .status(400)
          .send({
            message: "Sudah Di-Book. Tanggal Dan Waktu Sama"
          });
      } else {
        return db.booking
          .create({
            userId: userId,
            roomId: roomId,
            booking_title: booking_title,
            booking_description: booking_description,
            date: date
          })
          .then(booking => {
            return res.status(201).send({
              message: "Berhasil Di-Book!"
            });
          })
          .catch(err => {
            console.log(
              'error trying to add new booking: ',
              JSON.stringify(err)
            );
            return res.status(400).send(err);
          });
      }
    });
};

exports.list = function (req, res) {
  return db.room
    .findAll({
      include: [{
        model: bookings_room_model,
        as: 'bookings'
      }]
    })
    .then(rooms => {
      return res.status(200).send(rooms);
    })
    .catch(error => {
      return res.status(400).send(error);
    });
};
