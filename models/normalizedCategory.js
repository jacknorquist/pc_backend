const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./product');


const NormalizedCategory = sequelize.define('NormalizedCategory', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
}, {
  tableName: 'normalized_categories',
  timestamps: false,
});

module.exports = NormalizedCategory;