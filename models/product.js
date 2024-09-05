const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Manufacturer = require('./manufacturer');
const NormalizedCategory = require('./normalizedCategory');
 // Adjust the path if necessary

 const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  normalized_category_name:{
    type: DataTypes.STRING,
    allowNull: false,
    references:{
      model: NormalizedCategory,
      key: 'name',
    }
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  manufacturer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Manufacturer,
      key: 'id',
    },
  },
  description: {
    type: DataTypes.STRING,
  },
  spec_sheet: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'products',
  timestamps: false,
  indexes: [
    {
      name: 'ix_product_manufacturer_id',
      fields: ['manufacturer_id'],
    },
  ],
});
module.exports = Product;