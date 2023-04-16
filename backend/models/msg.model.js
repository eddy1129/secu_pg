const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Msg = sequelize.define("msg", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    room: {
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
    },
    usermsg: {
      type: DataTypes.STRING,
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  });

  return Msg;
};
