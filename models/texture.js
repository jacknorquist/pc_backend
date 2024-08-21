const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./product');


const Texture = sequelize.define('Texture', {
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
}, {
  tableName: 'textures',
  timestamps: false,
});

module.exports = Texture