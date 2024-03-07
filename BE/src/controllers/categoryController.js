// src/controllers/categoryController.js

const Category = require('../models/Category');

// Controller function to get all categories
exports.getAllCategories = (req, res) => {
    Category.getAll((err, categories) => {
        if (err) {
            res.status(500).json({ error: 'Error fetching categories' });
        } else {
            res.status(200).json(categories);
        }
    });
};

// Controller function to get a specific category by ID
exports.getCategoryById = (req, res) => {
    const categoryId = req.params.id;
    Category.getById(categoryId, (err, category) => {
        if (err) {
            res.status(500).json({ error: 'Error fetching category' });
        } else {
            res.status(200).json(category);
        }
    });
};

// Controller function to create a new category
exports.createCategory = (req, res) => {
    const newCategory = req.body;
    Category.create(newCategory, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error creating category' });
        } else {
            res.status(201).json({ message: 'Category created successfully', categoryId: result.insertId });
        }
    });
};

// Controller function to update a category
exports.updateCategory = (req, res) => {
    const categoryId = req.params.id;
    const updatedCategory = req.body;
    Category.update(categoryId, updatedCategory, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error updating category' });
        } else {
            res.status(200).json({ message: 'Category updated successfully' });
        }
    });
};

// Controller function to delete a category
exports.deleteCategory = (req, res) => {
    const categoryId = req.params.id;
    Category.deleteCategory(categoryId, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error deleting category' });
        } else {
            res.status(200).json({ message: 'Category deleted successfully' });
        }
    });
};
