// src/components/ProductList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch the products from the backend
        axios.get('/api/products')
            .then((response) => setProducts(response.data))
            .catch((error) => console.error('Error fetching products', error));
    }, []);

    return (
        <div>
            <h2>Product List</h2>
            <ul>
                {products.map((product) => (
                    <li key={product._id}>
                        {product.name} - ${product.price}</li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;