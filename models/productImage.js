const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./product');
const Color = require('./color');



const ProductImage = sequelize.define('ProductImage', {
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
  color_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Color,
      key: 'id',
    },
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'product_images',
  timestamps: false,
});



module.exports = ProductImage;