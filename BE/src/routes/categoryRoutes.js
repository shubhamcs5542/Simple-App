// src/routes/categoryRoutes.js

const express = require('express');
const categoryController = require('../controllers/categoryController');

const router = express.Router();

// Route to get all categories
router.get('/', categoryController.getAllCategories);

// Route to get a specific category by ID
router.get('/:id', categoryController.getCategoryById);

// Route to create a new category
router.post('/', categoryController.createCategory);

// Route to update a category
router.put('/:id', categoryController.updateCategory);

// Route to delete a category
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
