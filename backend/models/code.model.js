const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Code = sequelize.define("code", {
        email: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        code: {
            type: DataTypes.STRING,
        }
    });

    return Code;
}