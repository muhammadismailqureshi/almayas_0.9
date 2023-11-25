// src/components/ProductDetail.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductDetail = ({ match }) => {
    const [product, setProduct] = useState(null);

    useEffect(() => {
        // Fetch the product details from the specified product ID
        axios.get(`/api/products/${productId}`)
            .then((response) => setProduct(response.data))
            .catch((error) => console.error('Error fetching product details:', error));
    }, [productId]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{product.name}</h2>
            <p>Price: ${product.price}</p>
            <p>Description: {product.description}</p>
            <button onClick = {()=> addToCart(product._id)}>Add to Cart</button>
        </div>
    );
};

export default ProductDetail;


            
        


    