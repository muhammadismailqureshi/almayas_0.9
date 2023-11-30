// Filename: App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import PasswordReset from './components/PasswordReset';
import PasswordResetVerification from './components/PasswordResetVerification';
import ForgotPassword from './components/ForgotPassword';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/password-reset" element={<PasswordReset />} />
        <Route path="/password-reset/verify/:token" element={<PasswordResetVerification />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </Router>        
  );
}
export default App;