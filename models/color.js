const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./product');
const ProductImage = require('./productImage');

const Color = sequelize.define('Color', {
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
    allowNull: false,
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  accent_color: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  texture: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'colors',
});

module.exports = Color;