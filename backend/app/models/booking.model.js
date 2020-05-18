module.exports = (sequelize, Sequelize) => {
  const Booking = sequelize.define("booking", {
    userId: {
      type: Sequelize.INTEGER,
    },
    roomId: {
      type: Sequelize.INTEGER,
    },
    booking_title: {
      type: Sequelize.STRING,
    },
    booking_description: {
      type: Sequelize.STRING,
    },
    date: {
      type: Sequelize.DATE
    }
  });

  return Booking;
};
