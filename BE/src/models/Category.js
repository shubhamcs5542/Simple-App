// src/models/Category.js
const db = require('../db');

class Category {
    static getAll(callback) {
        db.query('SELECT * FROM categories', callback);
    }

    static getById(id, callback) {
        db.query('SELECT * FROM categories WHERE category_id = ?', [id], callback);
    }

    static create(newCategory, callback) {
        db.query('INSERT INTO categories SET ?', newCategory, callback);
    }

    static update(id, updatedCategory, callback) {
        db.query('UPDATE categories SET ? WHERE category_id = ?', [updatedCategory, id], callback);
    }

    static deleteCategory(id, callback) {
        db.query('DELETE FROM categories WHERE category_id = ?', [id], callback);
    }
}

module.exports = Category;
