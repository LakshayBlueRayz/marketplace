const express = require('express');
const productRoutes = express.Router();
const ProductModel = require('../models/product');

// Fetch all products
productRoutes.get('/items', async (req, res) => {
    try {
        const items = await ProductModel.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve products.' });
    }
});

// Search products by name containing a substring
productRoutes.get('/items/search', async (req, res) => {
    const searchTerm = req.query.term;
    try {
        const foundItems = await ProductModel.find({ name: { $regex: searchTerm, $options: 'i' } });
        res.json(foundItems);
    } catch (err) {
        res.status(500).json({ message: 'Error during product search.' });
    }
});

// Fetch product using its ID
productRoutes.get('/items/:productId', async (req, res) => {
    const productId = req.params.productId;
    try {
        const singleProduct = await ProductModel.findById(productId);  // Use findById
        if (!singleProduct) {
            return res.status(404).json({ message: 'Product does not exist.' });
        }
        res.json(singleProduct);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch the product.' });
    }
});
// Add a new product
productRoutes.post('/items', async (req, res) => {
    try {
        const newProduct = new ProductModel(req.body);
        const storedProduct = await newProduct.save();
        res.status(201).json(storedProduct);
    } catch (err) {
        console.error(err);  // <-- Log the error for debugging
        res.status(500).json({ message: 'Failed to add the product.' });
    }
});

// Modify a product using its ID
productRoutes.put('/items/:productId', async (req, res) => {
    const productId = req.params.productId;
    try {
        const modifiedProduct = await ProductModel.findByIdAndUpdate(productId, req.body, { new: true });
        if (!modifiedProduct) {
            return res.status(404).json({ message: 'Product not available.' });
        }
        res.json(modifiedProduct);
    } catch (err) {
        console.error(err);  // <-- Log the error for debugging
        res.status(500).json({ message: 'Failed to update the product.' });
    }
});

// Delete all products
productRoutes.delete('/items', async (req, res) => {
    try {
        await ProductModel.deleteMany();
        res.json({ status: 'Successfully cleared all products.' });
    } catch (err) {
        console.error(err);  // <-- Log the error for debugging
        res.status(500).json({ message: 'Failed to delete products.' });
    }
});

// Remove a product using its ID
productRoutes.delete('/items/:productId', async (req, res) => {
    const productId = req.params.productId;
    try {
        const removedProduct = await ProductModel.findByIdAndDelete(productId);
        if (!removedProduct) {
            return res.status(404).json({ message: 'Product not found for deletion.' });
        }
        res.json({ status: 'Product removed successfully.', removedProduct });
    } catch (err) {
        console.error(err);  // <-- Log the error for debugging
        res.status(500).json({ message: 'Failed to delete the product.', details: err.message });
    }
});

module.exports = productRoutes;
