// src/components/Cart.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../src/App.css';

const Cart = ({userId}) => {
    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    
    useEffect(() => {
        // Fetch the cart items from the specified user

        axios.get(`/api/cart/${userId}`)
            .then((response) => {
                setCartItems(response.data.items);
                setTotalAmount(response.data.totalAmount);
            })
            .catch((error) => console.error('Error fetching cart items:', error));
    }, [userId]);

    const updateQuantity = (productId, newQuantity) => {
        // Update the quantity of the specified product in the cart
        const updatedCart = cartItems.map((item) => 
            item.product._id === productId ? { ...item, quantity: newQuantity } : item
        );
        setCartItems(updatedCart);
    };

    const removeItem = (productId) => {
        // Remove the specified product from the cart
        const updatedCart = cartItems.filter((item) => item.product._id !== productId);
        setCartItems(updatedCart);
    };

    const handleCheckout = () => {
        // Checkout - send a POST request to the server to create an order
        alert('Proceeding to checkout');
    };




    return (
        <div className="cart-container">
            <h2>Your Cart</h2>
            <ul>
                {cartItems.map((item) => (
                    <li key={item.product._id}>
                        <div className="cart-item">
                            <img
                                src={item.product.imageUrl}
                                alt={item.product.name}
                                className="cart-item-image"
                            />
                            <div className="cart-item-details">
                                <p>{item.product.name}</p>
                                <p>Price: PKR.{item.product.price}</p>
                                <p>
                                    Quantity:
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) => updateQuantity(item.product._id, e.target.value)}
                                        min="1"
                                    />
                                </p>
                                <button onClick={() => removeItem(item.product._id)}>Remove</button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="cart-summary">
                <p> Total Amount: PKR.{totalAmount}</p>
                <button onClick={handleCheckout}>Proceed to Checkout</button>
            </div>
        </div>
    );
};

export default Cart;            