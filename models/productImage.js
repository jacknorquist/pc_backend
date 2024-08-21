const { Sequelize, DataTypes } = require('sequelize');
const config = require('./config/config');
const dbConfig = config.development;
const sequelize = new Sequelize(dbConfig);
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
});

ProductImage.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });
Product.hasMany(ProductImage, { foreignKey: 'product_id', as: 'images' });
ProductImage.belongsTo(Color, { foreignKey: 'color_id', as: 'color' });
Color.hasMany(ProductImage, { foreignKey: 'color_id', as: 'color_images' });

module.exports = ProductImage;