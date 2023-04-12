const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Cart = sequelize.define("cartItem", {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      productId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      orderId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    });
  
    return Cart;
  }