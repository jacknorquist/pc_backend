const { Sequelize, DataTypes } = require('sequelize');
const config = require('./config/config');
const dbConfig = config.development;
const sequelize = new Sequelize(dbConfig);
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
});

Texture.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });
Product.hasMany(Texture, { foreignKey: 'product_id', as: 'textures' });

module.export; Texture