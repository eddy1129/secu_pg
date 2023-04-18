const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Score = sequelize.define("score", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    stuId: {
      type: DataTypes.STRING,
    },
    stuScore: {
      type: DataTypes.STRING,
    },
  });

  return Score;
};
