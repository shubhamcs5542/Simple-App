import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const CategoryForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/categories', { name, description });
      console.log('Category created successfully:', response.data);
      setName('');
      setDescription('');
      fetchCategories(); // Refresh categories after creation
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  const handleDelete = async (categoryId) => {
    try {
      await axios.delete(`http://localhost:5000/categories/${categoryId}`);
      console.log('Category deleted successfully');
      fetchCategories(); // Refresh categories after deletion
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <Box>
      <Box sx={{ marginBottom: 4 }}>
        <h2>Add Category</h2>
        <form onSubmit={handleSubmit} sx={{ '& .MuiTextField-root': { marginBottom: 2 } }}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            variant="outlined"
            margin="normal"
          />
          <TextField
            label="Description"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            variant="outlined"
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" sx={{ marginRight: 2 }}>
            Add Category
          </Button>
          <Button variant="contained" color="secondary" onClick={() => { setName(''); setDescription(''); }}>
            Clear
          </Button>
        </form>
      </Box>

      <Box>
        <h2>Categories</h2>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map(category => (
                <TableRow key={category.category_id}>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>{category.description}</TableCell>
                  <TableCell>
                    <Button variant="outlined" color="primary" sx={{ marginRight: 1 }}>
                      Edit
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={() => handleDelete(category.category_id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default CategoryForm;
