const { Sequelize, DataTypes } = require('sequelize');
const config = require('./config/config');
const dbConfig = config.development;
const sequelize = new Sequelize(dbConfig);
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

Size.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });
Product.hasMany(Size, { foreignKey: 'product_id', as: 'sizes' });

module.exports = Size;