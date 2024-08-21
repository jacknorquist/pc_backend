require('dotenv').config();
const express = require('express');
const app = express();
const config = require('./config/config');
const port = process.env.PORT || 3000;
const { Sequelize, DataTypes } = require('sequelize');
const authenticate = require('./middleware/auth');


const dbConfig = config.development;

// Middleware to parse JSON
app.use(express.json());

// Create a Sequelize instance
const sequelize = new Sequelize(dbConfig);

// Sync the database
sequelize.sync().then(() => {
  console.log('Database & tables created!');
});

// Define routes
app.get('/products', (req, res) => {
  res.json({ message: 'This is a protected route' });
});

app.get('/product:productName', async (req, res) => {
  const productId = req.params.productId;
  try {
    // Query the database for the product
    const product = await Product.findByPk(productId);

    if (product) {
      // Send the product details as a response
      res.json(product);
    } else {
      // Product not found
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});