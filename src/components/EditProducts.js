// src/components/EditProduct.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';


// Component for editing a product

const EditProduct = ({ match }) => {

    const [product, setProduct] = useState({});
    const productId = match.params.productId;

    // Fetch the product from the backend

    useEffect(() => {
        axios.get(`/api/products/${productId}`)
            .then((response) => setProduct(response.data))
            .catch(error => console.error('Error fetching product: ', error));
    }, [productId]);

    // Function to update product details in the backend

    const updateProduct = async () => {
        try {
            const response = await axios.put(`/api/products/${productId}`, product);
            console.log('Product updated: ', response.data);
            // Refresh product list or redirect to product list page
        } catch (error) {
            console.error('Error updating product: ', error);
        }

    };

    return (
        <div>
            <h2>Edit Product</h2>
            <form>
                <label>Name:</label>
                <input
                    type="text"
                    value={product.name}
                    onChange={(e) => setProduct({ ...product, name: e.target.value })}
                />
                <label>Description:</label>
                <input
                    type="text"
                    value={product.description}
                    onChange={(e) => setProduct({ ...product, description: e.target.value })}
                />
                <label>Price:</label>
                <input
                    type="number"
                    value={product.price}
                    onChange={(e) => setProduct({ ...product, price: e.target.value })}
                />
                <label>Image URL:</label>
                <input
                    type="text"
                    value={product.imageUrl}
                    onChange={(e) => setProduct({ ...product, imageUrl: e.target.value })}
                />
                <button type="button" onClick={updateProduct}> Update Product </button>

            </form>
        </div>
    );
};

export default EditProduct;