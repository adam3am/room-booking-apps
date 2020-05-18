module.exports = (sequelize, Sequelize) => {
  const Pictures = sequelize.define("pictures", {
    roomId: {
      type: Sequelize.INTEGER
    },
    url: {
      type: Sequelize.STRING
    }
  });

  return Pictures;
};
