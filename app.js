const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes'); 

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


const MONGO_URI = 'mongodb+srv://lakshaysingh1881:Ak8571024286@cluster0.e1gqowu.mongodb.net/lakshay';
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Lakhshay Clothes Shop application.' });
});

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Use the productRoutes for product-related routes
app.use('/api', productRoutes);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

