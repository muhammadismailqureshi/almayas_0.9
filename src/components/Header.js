// src/components/Header.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../src/App.css'


const Header = () => {
    const [isNavVisible, setNavVisibility] = useState(false);

    const toggleNav = () => {
        setNavVisibility(!isNavVisible);
    };


    return (
        <header>

            <div className="mobile-menu" onClick={toggleNav}>
                <span></span>
                <span></span>
                <span></span>
            </div>

            <div className="logo">
                <Link to="/">Almayas</Link>
            </div>
            <nav className={`${isNavVisible ? 'show':''}`}>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/products">Products</Link></li>
                    <li><Link to="/cart">Cart</Link></li>
                    <li><Link to="/Checkout">Checkout</Link> </li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>

                </ul>
            </nav>
        </header>
    );
}

export default Header;
