const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');


const Manufacturer = sequelize.define('Manufacturer', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  tableName: 'manufacturers',
});

module.exports = Manufacturer;