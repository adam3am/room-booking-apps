const bcrypt = require('bcryptjs');

// database
const db = require("./app/models");

const Role = db.role;
const User = db.user;
const Room = db.room;
const pictures_room_model = db.pictures;

// seed
function initial() {
  Role.create({
    id: 1,
    name: "user",
    createdAt: new Date(),
    updatedAt: new Date()
  });

  Role.create({
    id: 2,
    name: "admin",
    createdAt: new Date(),
    updatedAt: new Date()
  });

  Room.create({
    name: 'U-Shape',
    description: 'Bersebelahan dan Bersebrangan',
    capacity: 20,
    assets: 'Wifi',
    pictures: {
      url: 'https://uptown.id/wp-content/uploads/2020/03/U-Shape-Meeting-Room-Jakarta-768x512.jpg'
    },
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    include: [{
      model: pictures_room_model,
      as: 'pictures'
    }]
  });
  Room.create({
    name: 'Boardroom',
    description: 'Bangku yang Berhadapan',
    capacity: 14,
    assets: 'Water',
    pictures: {
      url: 'https://uptown.id/wp-content/uploads/2020/03/Boardroom-Meeting-Room-Jakarta-768x512.jpg'
    },
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    include: [{
      model: pictures_room_model,
      as: 'pictures'
    }]
  });
  Room.create({
    name: 'Classroom',
    description: 'Menghadap ke Pembicara',
    capacity: 35,
    assets: 'Monitor',
    pictures: {
      url: 'https://uptown.id/wp-content/uploads/2020/03/Classroom-Meeting-Room-Jakarta.jpg'
    },
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    include: [{
      model: pictures_room_model,
      as: 'pictures'
    }]
  });
  Room.create({
    name: 'Teater',
    description: 'Kapasitas Besar',
    capacity: 54,
    assets: 'Projector',
    pictures: {
      url: 'https://uptown.id/wp-content/uploads/2020/03/Teater-Meeting-Room-Jakarta-768x512.jpg'
    },
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    include: [{
      model: pictures_room_model,
      as: 'pictures'
    }]
  });
  Room.create({
    name: 'V Style',
    description: 'Meeting atau Seminar',
    capacity: 10,
    assets: 'Printer',
    pictures: {
      url: 'https://uptown.id/wp-content/uploads/2020/03/V-Style-Meeting-Room-Jakarta-768x512.jpg'
    },
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    include: [{
      model: pictures_room_model,
      as: 'pictures'
    }]
  });
  Room.create({
    name: 'Melbourne Square',
    description: 'Berbentuk Segi Empat ',
    capacity: 42,
    assets: 'Fans',
    pictures: {
      url: 'https://uptown.id/wp-content/uploads/2020/03/Melbourne-Square-Meeting-Room-Jakarta-768x512.jpg'
    },
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    include: [{
      model: pictures_room_model,
      as: 'pictures'
    }]
  });
  Room.create({
    name: 'Hollow Shape',
    description: 'Berbentuk Persegi Panjang',
    capacity: 5,
    assets: 'Notepad',
    pictures: {
      url: 'https://uptown.id/wp-content/uploads/2020/03/Hollow-Shape-Meeting-Room-Jakarta-768x512.jpg'
    },
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    include: [{
      model: pictures_room_model,
      as: 'pictures'
    }]
  });
  Room.create({
    name: 'Banquet',
    description: 'Ukuran Meja Cukup Besar',
    capacity: 56,
    assets: 'Food',
    pictures: {
      url: 'https://uptown.id/wp-content/uploads/2020/03/Banquet-Meeting-Room-Jakarta-768x512.jpg'
    },
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    include: [{
      model: pictures_room_model,
      as: 'pictures'
    }]
  });

  User.create({
      username: "admin",
      email: "admin@example.com",
      password: bcrypt.hashSync("admin123", 8),
      createdAt: new Date(),
      updatedAt: new Date()
    }).then(user => {
      const admin = User.findAll({
        where: {
          username: "admin"
        }
      })

      if (admin) {
        user.setRoles([2]).then(() => {
          console.log({
            message: "Seed db successfully!"
          });
        });
      }
    })
    .catch(err => {
      console.log({
        message: err.message
      });
    });
}

// force: true Drop and Resync Database
db.sequelize.sync({
  force: true
}).then(() => {
  console.log('Drop and Resync Database');
  initial();
});
