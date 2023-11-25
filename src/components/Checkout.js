// src/components/Checkout.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Checkout = ({ userId }) => {

    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        // Fetch the cart items from the specified user ID
        axios.get(`/api/cart/${userId}`)
            .then((response) => {
                setCartItems(response.data.items);
                setTotalAmount(response.data.totalAmount);
            })
            .catch((error) => console.error('Error fetching cart items:', error));
    }, [userId]);

    const placeOrder = () => {
        // Initializing the order placement process
        axios.post('/api/orders', { 
            userId,
            products: cartItems.map((item) => ({
                productId: item.product._id,
                quantity: item.quantity,
            })),
            totalAmount,
        })
            .then((response) => {
                console.log('Order placed successfully:', response.data);

                //Optionally,  you can redirect the user to the order confirmation page
            }
            )
            .catch((error) => console.error('Error placing order:', error));
    };

    return (
        <div>
            <h2>Checkout</h2>
            <ul>
                {cartItems.map((item) => (
                    <li key={item.product._id}>
                        {item.product.name} - Quantity: {item.quantity} - Subtotal: ${item.subtotal}
                    </li>
                ))}
            </ul>
            <p>Total Amount: ${totalAmount}</p>
            <button onClick={placeOrder}>Place Order</button>
        </div>
    );
};

export default Checkout;
                    
