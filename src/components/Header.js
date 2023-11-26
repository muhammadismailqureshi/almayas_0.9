// src/components/Header.js

import React from 'react';
import { Link } from 'react-router-dom';
import '../../src/App.css'

const Header = () => {

    return (
        <header>

            <div className="mobile-menu">
                <span></span>
                <span></span>
                <span></span>
            </div>

            <div className="logo">
                <Link to="/">Almayas</Link>
            </div>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/products">Products</Link></li>
                    <li><Link to="/cart">Cart</Link></li>
                    <li><Link to="/Checkout"></Link> </li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>

                </ul>
            </nav>
        </header>
    );
}

export default Header;
