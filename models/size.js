const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./product');


const Size = sequelize.define('Size', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Product,
      key: 'id',
    },
  },
  name: {
    type: DataTypes.STRING,
  },
  image_url: {
    type: DataTypes.STRING,
  },
  dimensions: {
    type: DataTypes.ARRAY(DataTypes.STRING), // Use ARRAY for PostgreSQL
    allowNull: false,
  },
}, {
  tableName: 'sizes',
});



module.exports = Size;