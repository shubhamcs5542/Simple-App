import React from 'react';
import CategoryList from './components/CategoryList';
import CategoryForm from './components/CategoryForm';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';

function App() {
  return (
    <div className="App">
      <div className="category-section">
        <CategoryForm />
        <CategoryList />
      </div>
      <div className="product-section">
        <ProductForm />
        <ProductList />
      </div>
    </div>
  );
}

export default App;
