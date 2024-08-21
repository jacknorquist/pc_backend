require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const sequelize = require('./config/database');
const authenticate = require('./middleware/auth')
const {Product, Manufacturer, Color, Texture, Size, ProductImage} = require('./models/index');



// Middleware to parse JSON
app.use(express.json());
//Middleware to authenticate
// app.use(authenticate)

// Define routes
app.get('/products', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error });
  }
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