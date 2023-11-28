// src/components/ProductDetail.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../src/App.css';



const ProductDetail = ({ match }) => {
    const [product, setProduct] = useState(null);

    useEffect(() => {
        // Fetch the product details from the specified product ID
        const productId = match.params.productId;
        axios.get(`/api/products/${productId}`)
            .then((response) => setProduct(response.data))
            .catch((error) => console.error('Error fetching product details:', error));
    }, [match.params.productId]);

    const addToCart = (productId) => {
        axios.post(`/api/cart`, { productId })
            .then((response) => console.log(response.data))
            .catch((error) => console.error('Error adding to cart:', error));
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="product-detail-container">
            <div className="product-image">
                {/* Display the product image here*/}
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="product-main-image"
                />
                {/* Display the product thumbnails here*/}
                </div>
                <div className="product-details">
                    <h2>{product.name}</h2>
                    <p>Price: PKR.{product.price}</p>
                    <p>Description: {product.description}</p>
                    <button onClick={() => addToCart(product._id)}> Add to Cart</button>
                </div>
                <div className="product-reviews">
                    {/* Display the product reviews here*/}
                    <h3>Cutomer Reviews</h3>
                    {/* List of reviews with user comments and ratings */}
                </div>
            </div>
        );
    }
export default ProductDetail;