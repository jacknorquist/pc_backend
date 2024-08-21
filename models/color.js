const { Sequelize, DataTypes } = require('sequelize');
const config = require('./config/config');
const dbConfig = config.development;
const sequelize = new Sequelize(dbConfig);
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

Color.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });
Product.hasMany(Color, { foreignKey: 'product_id', as: 'colors' });
Color.hasMany(ProductImage, { foreignKey: 'color_id', as: 'color_images' });

module.exports = Color;