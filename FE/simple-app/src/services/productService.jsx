// src/services/productService.js

const BASE_URL = 'http://localhost:5000/products'; // Replace with your backend URL

async function getAllProducts() {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }
    return response.json();
}

async function getProductById(productId) {
    const response = await fetch(`${BASE_URL}/${productId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch product');
    }
    return response.json();
}

async function createProduct(productData) {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
    });
    if (!response.ok) {
        throw new Error('Failed to create product');
    }
    return response.json();
}

async function updateProduct(productId, updatedProductData) {
    const response = await fetch(`${BASE_URL}/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedProductData)
    });
    if (!response.ok) {
        throw new Error('Failed to update product');
    }
    return response.json();
}

async function deleteProduct(productId) {
    const response = await fetch(`${BASE_URL}/${productId}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error('Failed to delete product');
    }
    return response.json();
}

export { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };
