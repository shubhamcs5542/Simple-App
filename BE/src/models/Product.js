// src/models/Product.js
const db = require('../db');

class Product {
    static getAll(callback) {
        db.query('SELECT * FROM products', callback);
    }

    static getById(id, callback) {
        db.query('SELECT * FROM products WHERE product_id = ?', [id], callback);
    }

    static create(newProduct, callback) {
        db.query('INSERT INTO products SET ?', newProduct, callback);
    }

    static update(id, updatedProduct, callback) {
        db.query('UPDATE products SET ? WHERE product_id = ?', [updatedProduct, id], callback);
    }

    static deleted(id, callback) {
        db.query('DELETE FROM products WHERE product_id = ?', [id], callback);
    }
}

module.exports = Product;
