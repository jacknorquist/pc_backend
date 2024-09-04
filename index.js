require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const sequelize = require('./config/database');
const authenticate = require('./middleware/auth')
const {Product, Manufacturer, Color, Texture, Size, ProductImage} = require('./models/index');
app.use(cors());



// Middleware to parse JSON
app.use(express.json());
//Middleware to authenticate
app.use(authenticate)

// Define routes
app.get('/products', async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        {
          model: ProductImage,
          as: 'images',
        },
        {
          model: Color,
          as: 'colors',
        },
      ],
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.get('/products/:productId', async (req, res) => {
  const productId = req.params.productId;
  try {
    // Query the database for the product
    const product = await Product.findByPk(productId, {
      include: [
        { model: Color, as: 'colors' },
        { model: Size, as: 'sizes' },
        { model: Texture, as: 'textures' },
        { model: ProductImage, as: 'images' },
        { model: Manufacturer, as: 'manufacturer' }
      ]
    });

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

app.get('/products/:category', async (req, res) => {
  const category = req.params.category; // Corrected parameter name
  try {
    // Query the database for products with the specified category
    const products = await Product.findAll({
      where: { normalized_category_name: category }, // Assuming 'category' is a column in Product
      include: [
        { model: Color, as: 'colors' },
        { model: ProductImage, as: 'images' },
        { model: Manufacturer, as: 'manufacturer' }
      ]
    });


    if (products.length > 0) {
      // Send the products as a response
      res.json(products);
    } else {
      // No products found for the category
      res.status(404).json({ error: 'No products found for this category. Please try agian' });
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
