const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const PaymentRecord = sequelize.define("paymentRecord", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.STRING,
    },
    date: {
      type: DataTypes.STRING,
    },
  });

  return PaymentRecord;
};
