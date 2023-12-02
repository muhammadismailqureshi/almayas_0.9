// src/components/AddProduct.js

import React, { useState } from 'react';
import axios from 'axios';

// Component for adding a new product

const AddProduct = () => {
    const [newProduct, setNewProduct] = useState({ name: '', description: '', price: 0,imageUrl:'' });

    // Function to add a new product to the database
    const addProduct = async () => {
        try {
            const response = await axios.post('/api/products', newProduct);
            console.log('Product added: ', response.data);
            // Refresh product list or redirect to product list page
        } catch (error) {
            console.error('Error adding product: ', error);
        }
    };


    return (
        <div>
            <h2>Add Product</h2>
            <form>
                <label>Name:</label>
                <input
                    type="text"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                />
                <label>Description:</label>
                <input
                    type="text"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                />
                <label>Price:</label>
                <input
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                />
                <label>Image URL:</label>
                <input
                    type="text"
                    value={newProduct.imageUrl}
                    onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
                />
                <button type="button" onClick={addProduct}> Add Product </button>

            </form>
        </div>
    );
};

export default AddProduct;




    