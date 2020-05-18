module.exports = (sequelize, Sequelize) => {
  const Room = sequelize.define("room", {
    name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    capacity: {
      type: Sequelize.INTEGER
    },
    assets: {
      type: Sequelize.STRING
    }
  });

  return Room;
};
