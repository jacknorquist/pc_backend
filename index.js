require('dotenv').config();
const express = require('express');
const app = express();
const config = require('./config/config');
const port = process.env.PORT || 3000;
const { Sequelize, DataTypes } = require('sequelize');


const dbConfig = config.development;

// Middleware to parse JSON
app.use(express.json());

// Create a Sequelize instance
const sequelize = new Sequelize(dbConfig);

// Define a Product model
const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  }
});

// Sync the database
sequelize.sync().then(() => {
  console.log('Database & tables created!');
});

// Define routes
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});