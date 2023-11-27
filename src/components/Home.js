//src/components/Home.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../src/App.css';
import Header from '../components/Header';

const Home = () => {
    const [featuredProduct, setFeaturedProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch featured product from the backend
        axios.get('/api/products/featured')
            .then((response) => {
                setFeaturedProduct(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError('An error occurred. Try again later.');
                setLoading(false);
                console.error(error);
            });
    }, []);

    return (
        <div className="home-container">
            <Header />
            <h2 className="featured-heading">Featured Products</h2>
            <h3 className="featured-subheading">Check out some of our favorite listings</h3>
            {loading && <p>Loading...</p>}
            {error && <p style={{color: 'red'}}>{error}</p>}
                <div className="product-grid">
                    {featuredProduct.map((product) => (
                        <div className="product-card" key={product._id}>
                            <Link to={`/products/${product._id}`}>
                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className='product-image'
                                    style={{ maxWidth: '100px' }}
                                />
                                <div className="product-details">
                                    <p className="product-name">{product.name}</p>
                                    <p className="product-price">${product.price}</p>
                                </div>                                           
                            </Link>                            
                        </div>
                    ))}                            
                </div>
        </div>
    );
};
export default Home;           