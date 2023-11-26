import React from "react";
import { Link } from "react-router-dom";
import "../../src/App.css";

const Navbar = () => {
    return (
        <nav className="nav-links">
            <div className="mobile-menu">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <ul>
                <li>
                    <Link to="/" className="nav-link"></Link>
                </li>
                <li>
                    <Link to="/products" className="nav-link">
                        Products
                    </Link>
                </li>
                <li>
                    <Link to="/cart" className="nav-link">
                        Cart
                    </Link>
                </li>
                <li>
                    <Link to="/Checkout" className="nav-link">
                        Checkout
                    </Link>
                </li>
                <li>
                    <Link to="/login" className="nav-link">
                        Login
                    </Link>
                </li>
                <li>
                    <Link to="/register" className="nav-link">
                        Register
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
