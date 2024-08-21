require('dotenv').config();



// middleware/auth.js
function authenticate (req, res, next) {
  const apiKey = req?.headers['api-key'];
  const validApiKeys = process.env.API_KEYS.split(',');

  if (validApiKeys.includes(apiKey)) {
    next(); // API key is valid, proceed to the next middleware or route handler
  } else {
    res?.status(401).json({ error: 'Unauthorized' }); // Invalid API key
  }
};

module.exports=authenticate
