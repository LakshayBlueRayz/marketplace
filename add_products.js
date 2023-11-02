const mongoose = require('mongoose');
const Product = require('./models/product.js'); 
const productsData = require('./data.json'); 

// Function to add products to the database
const addProductsToDatabase = async () => {
  try {
    for (let product of productsData) {
      const newProductEntry = new Product(product);
      await newProductEntry.save();
    }
    console.log("All products added successfully!");
    mongoose.connection.close();
  } catch (err) {
    console.error("Error adding products:", err);
  }
};

mongoose.connect('mongodb+srv://lakshaysingh1881:Ak8571024286@cluster0.e1gqowu.mongodb.net/lakshay')
  .then(() => {
    console.log('Connected to MongoDB');
    // Only call the function to add products once you're sure the connection is established
    addProductsToDatabase();
  })
  .catch(err => console.error('Could not connect to MongoDB', err));
