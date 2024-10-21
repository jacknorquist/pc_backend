require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const sequelize = require('./config/database');
const authenticate = require('./middleware/auth')
const {Product, Manufacturer, Color, Texture, Size, ProductImage, NormalizedCategory} = require('./models/index');
app.use(cors());

const urlCategories ={
  'pavers-slabs': 'Pavers & Slabs',
  'permeable-pavements': 'Permeable Pavements',
  'walls': 'Walls',
  'steps': 'Steps',
  'edgers': 'Edgers',
  'caps': 'Caps',
  'outdoor-&-fireplace-kits': 'Outdoor & Fireplace Kits',
  'accessories': 'Accessories'
}



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
      order: [['name', 'ASC']]
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.get('/product/:productId', async (req, res) => {
  const productId = Number(req.params.productId);
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
  const categoryName = req.params.category;
  const cleanedCategoryName = categoryName.replace(/-/g, ' ');

  try {
    // Directly fetch products by category name
    const products = await Product.findAll({
      include: [
        {
          model: NormalizedCategory,
          as: 'normalizedCategory',
          where: { name: urlCategories[categoryName] },
          required: true,
        },
        {
          model: ProductImage,
          as: 'images'
        },
        {
          model: Color,
          as: 'colors'
        }
      ],
      order: [['name', 'ASC']] // Sort products by name
    });

    if (products.length) {
      res.json(products);
    } else {
      res.status(404).json({ error: 'No products found for this category.' });
    }
  } catch (error) {
    console.error('Error details:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});


app.get('/categories', async (req, res) => {
  try {
    // Fetch all categories without any associations
    const categories = await NormalizedCategory.findAll({
      attributes: ['name'], // Only select the 'name' attribute
      order: [['name', 'ASC']], // Sort categories by name
    });

    // Check if categories exist
    if (categories.length) {
      res.json(categories); // Send back the category names
    } else {
      res.status(404).json({ error: 'No categories found.' }); // Handle no categories case
    }
  } catch (error) {
    console.error('Error details:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message }); // Handle server errors
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
