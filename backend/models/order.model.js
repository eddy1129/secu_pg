const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Order = sequelize.define("order", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
      },
      status: {
        type: DataTypes.ENUM,
        values: ["pending", "delivered", "cancelled"],
      },
      total: {
        type: DataTypes.FLOAT,
      },
    });
  
    return Order;
  }