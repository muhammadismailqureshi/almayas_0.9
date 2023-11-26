//src/components/Home.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';

const Home = () => {
    const [featuredProduct, setFeaturedProduct] = useState([]);

    useEffect(() => {
        // Fetch featured product from the backend
        axios.get('/api/products/featured')
            .then((response) => setFeaturedProduct(response.data))
            .catch((error) => console.error('Error fetching featured product', error));
    }
        , []);

    return (
        <div>
            <Header />
            <h2>Featured Product</h2>
                <ul>
                    {featuredProduct.map((product) => (
                        <li key={product._id}>
                            {product.name} - ${product.price}</li>
                    ))}

                            
                </ul>
        </div>
    );
};

export default Home;

            