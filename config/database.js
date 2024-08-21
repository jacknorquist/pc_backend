const { Sequelize } = require('sequelize');
require('dotenv').config();

// Initialize Sequelize
const sequelize = new Sequelize({
  username: process.env.DEV_DB_USER,
  password: process.env.DEV_DB_PASSWORD,
  database: process.env.DEV_DB_NAME,
  host: process.env.DEV_DB_HOST,
  port: process.env.DEV_DB_PORT || 5432,
  dialect: 'postgres',// Set to true if you want to see SQL queries
});

module.exports = sequelize;