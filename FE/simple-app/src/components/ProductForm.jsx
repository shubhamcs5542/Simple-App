import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const ProductForm = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [selectedProductId, setSelectedProductId] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedProductId) {
        await axios.put(`http://localhost:5000/products/${selectedProductId}`, { name, category_id: categoryId, price, description });
        console.log('Product updated successfully');
      } else {
        await axios.post('http://localhost:5000/products', { name, category_id: categoryId, price, description });
        console.log('Product created successfully');
      }
      clearForm();
      fetchProducts(); // Refresh products after creation or update
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEdit = (product) => {
    setSelectedProductId(product.product_id);
    setName(product.name);
    setCategoryId(product.category_id);
    setPrice(product.price);
    setDescription(product.description);
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/products/${productId}`);
      console.log('Product deleted successfully');
      fetchProducts(); // Refresh products after deletion
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const clearForm = () => {
    setSelectedProductId('');
    setName('');
    setCategoryId('');
    setPrice('');
    setDescription('');
  };

  return (
    <Box>
      <Typography variant="h2">Add Product</Typography>
      <form onSubmit={handleSubmit} sx={{ '& > div': { marginBottom: 2 } }}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant="outlined"
          fullWidth
        />
        <TextField
          label="Category ID"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          variant="outlined"
          fullWidth
        />
        <TextField
          label="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          variant="outlined"
          fullWidth
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          variant="outlined"
          fullWidth
          multiline
          rows={4}
        />
        <Button type="submit" variant="contained" color="primary" sx={{ marginRight: 2 }}>
          {selectedProductId ? 'Update Product' : 'Add Product'}
        </Button>
        <Button variant="contained" color="secondary" onClick={clearForm}>
          Clear
        </Button>
      </form>

      <Typography variant="h2" sx={{ marginTop: 4 }}>Products</Typography>
      <Box>
        {products.map(product => (
          <Box key={product.product_id} sx={{ marginBottom: 2 }}>
            <Typography variant="h3">{product.name}</Typography>
            <Typography>Category ID: {product.category_id}</Typography>
            <Typography>Price: {product.price}</Typography>
            <Typography>Description: {product.description}</Typography>
            <Button variant="outlined" color="primary" sx={{ marginRight: 1 }} onClick={() => handleEdit(product)}>
              Edit
            </Button>
            <Button variant="outlined" color="secondary" onClick={() => handleDelete(product.product_id)}>
              Delete
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ProductForm;
