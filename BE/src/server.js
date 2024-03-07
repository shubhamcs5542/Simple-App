// src/server.js
const express = require('express');
const dotenv = require('dotenv');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const cors = require('cors'); // Import cors package


dotenv.config();

const app = express();

app.use(cors()); // Use cors middleware

app.use(express.json());

app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
