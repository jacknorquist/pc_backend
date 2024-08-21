
const { Sequelize } = require('sequelize');
const sequelize = require('../config/database');

// Import models
const Product = require('./product');
const Manufacturer = require('./manufacturer');
const Size = require('./size');
const Color = require('./color');
const Texture = require('./texture');
const ProductImage = require('./productImage');

// Define associations
const defineAssociations = () => {
  Manufacturer.hasMany(Product, { foreignKey: 'manufacturer_id', as: 'products' });
  Product.belongsTo(Manufacturer, { foreignKey: 'manufacturer_id', as: 'manufacturer' });

  Product.hasMany(Size, { foreignKey: 'product_id', as: 'sizes' });
  Size.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

  Product.hasMany(Color, { foreignKey: 'product_id', as: 'colors' });
  Color.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

  Product.hasMany(Texture, { foreignKey: 'product_id', as: 'textures' });
  Texture.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

  Product.hasMany(ProductImage, { foreignKey: 'product_id', as: 'images' });
  ProductImage.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

  Color.hasMany(ProductImage, { foreignKey: 'color_id', as: 'color_images' });
  ProductImage.belongsTo(Color, { foreignKey: 'color_id', as: 'color' });
};

defineAssociations();

// Export models
module.exports = {
  Product,
  Manufacturer,
  Size,
  Color,
  Texture,
  ProductImage,
};