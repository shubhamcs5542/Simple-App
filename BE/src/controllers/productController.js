// src/controllers/productController.js

const Product = require('../models/Product');

const productController = {
    getAllProducts: (req, res) => {
        Product.getAll((err, products) => {
            if (err) {
                console.error('Error fetching products: ', err);
                res.status(500).json({ error: 'Internal server error' });
            } else {
                res.json(products);
            }
        });
    },

    // Add more controller functions as needed

    getProductById: (req, res) => {
        const productId = req.params.id;
        Product.getById(productId, (err, product) => {
            if (err) {
                console.error('Error fetching product: ', err);
                res.status(500).json({ error: 'Internal server error' });
            } else {
                res.json(product);
            }
        });
    },

    createProduct: (req, res) => {
        const newProduct = req.body;
        Product.create(newProduct, (err, result) => {
            if (err) {
                console.error('Error creating product: ', err);
                res.status(500).json({ error: 'Internal server error' });
            } else {
                res.status(201).json({ message: 'Product created successfully', productId: result.insertId });
            }
        });
    },

    updateProduct: (req, res) => {
        const productId = req.params.id;
        const updatedProduct = req.body;
        Product.update(productId, updatedProduct, (err, result) => {
            if (err) {
                console.error('Error updating product: ', err);
                res.status(500).json({ error: 'Internal server error' });
            } else {
                res.json({ message: 'Product updated successfully' });
            }
        });
    },

    deleteProduct: (req, res) => {
        const productId = req.params.id;
        Product.delete(productId, (err, result) => {
            if (err) {
                console.error('Error deleting product: ', err);
                res.status(500).json({ error: 'Internal server error' });
            } else {
                res.json({ message: 'Product deleted successfully' });
            }
        });
    }
};

module.exports = productController;
