// src/components/ProductList.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../src/App.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch the products from the backend
        axios.get('/api/products')
            .then((response) => setProducts(response.data))
            .catch((error) => console.error('Error fetching products', error));
    }, []);

    return (
        <div className="product-list-container">
            <h2>Products</h2>
            <div className="product-grid">
                {products.map((product) => (
                    <div key={product._id} className="product-card">
                        <Link to={`/products/${product._id}`}>
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="product-image"
                            />
                            <h3 className="product-name">{product.name}</h3>
                        </Link>
                        <p className="product-price">PKR.{product.price}</p>
                        <button className="add-to-cart-button">Add to Cart</button>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default ProductList;