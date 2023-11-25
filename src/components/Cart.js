// src/components/Cart.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = ({userId}) => {
    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    
    useEffect(() => {
        // Fetch the cart items from the specified user

        axios.get(`/api/cart/${userId}`)
            .then((response) => {
                setCartItems(response.data.items);
                setTotalAmount(response.data.totalAmount);
            }
            )
            .catch((error) => console.error('Error fetching cart items:', error));
    }, [userId]);

    return (
        <div>
            <h2>Shopping Cart</h2>
            <ul>
                {cartItems.map((item) => (
                    <li key={item._id}>
                        {item.product.name} - Quantity: {item.quantity} - Subtotal: ${item.subtotal}
                    </li>
                ))}
            </ul>
            <p>Total Amount: ${totalAmount}</p>
        </div>
    );
};

export default Cart;

            