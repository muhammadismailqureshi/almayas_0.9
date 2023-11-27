import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/products" exact element={<ProductList />} />
        <Route path="/products/:productId" component={<ProductDetail />} />
        <Route path="/cart" component={<Cart />} />
        <Route path="/checkout" component={<Checkout />} />
      </Routes>
    </Router>
        
  );
}
export default App;