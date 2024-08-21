
const { Sequelize, DataTypes } = require('sequelize');
const config = require('./config/config');
const dbConfig = config.development;
const sequelize = new Sequelize(dbConfig);

// Import model files
const Manufacturer = require('./manufacturer');
const Product = require('./product');
const Size = require('./size');
const Color = require('./color');
const Texture = require('./texture');
const ProductImage = require('./productImage');

// Initialize models
const models = {
  Manufacturer: Manufacturer(sequelize, Sequelize.DataTypes),
  Product: Product(sequelize, Sequelize.DataTypes),
  Size: Size(sequelize, Sequelize.DataTypes),
  Color: Color(sequelize, Sequelize.DataTypes),
  Texture: Texture(sequelize, Sequelize.DataTypes),
  ProductImage: ProductImage(sequelize, Sequelize.DataTypes),
};

// Set up associations
const defineAssociations = () => {
  const { Manufacturer, Product, Size, Color, Texture, ProductImage } = models;

  // Define associations
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

// Initialize associations
defineAssociations();

// Export models
module.exports = models;