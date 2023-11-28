import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../src/App.css';

const Checkout = ({ userId, amount, orderId, description }) => {
  const [paymentMethod, setPaymentMethod] = useState('COD');
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

  const handlePayment = async () => {
    try {
      if (paymentMethod === 'COD') {
        // Handle the payment for COD
        console.log('Processing COD payment');
      } else if (paymentMethod === 'JazzCash') {
        // Handle the payment for JazzCash
        const response = await axios.post('/api/jazzcash/initiate-payment', {
          amount: totalAmount,
          orderId: generateOrderId(), // Generate a unique order ID
          description: 'Payment for your order',
        });

        const { paymentUrl } = response.data;

        // Redirect the user to the JazzCash payment page
        window.location.href = paymentUrl;
      }
      // Add conditions for other payment methods if needed
    } catch (error) {
      console.error('Error handling payment:', error);
    }
  };

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
        // Optionally, you can redirect the user to the order confirmation page
      })
      .catch((error) => console.error('Error placing order:', error));
  };

  const generateOrderId = () => {
    // Generate a random order ID
    return 'ORD-' + Math.floor(Math.random() * 1000000);
  };

  return (
    <div className="checkout-container">
      <div className="checkout-summary">
        <h2>Order Summary</h2>
        <ul>
          {cartItems.map((item) => (
            <li key={item.product._id}>
              <div className="checkout-item">
                <img
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  className="checkout-item-image"
                />
                <div className="checkout-item-details">
                  <p>{item.product.name}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Subtotal: ${item.subtotal}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <p>Total Amount: PKR.{totalAmount}</p>
      </div>
      <div className="checkout-payment">
        <h2> Payment Information</h2>
        <label>
          Payment Method:
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="COD">Cash on Delivery</option>
            <option value="JazzCash">JazzCash</option>
            <option value="Easypaisa">Easypaisa</option>
          </select>
        </label>
        <button onClick={handlePayment}>Proceed to Payment</button>
      </div>
      <div className="checkout-shipping">
        <h2> Shipping Information</h2>
        <label>
          Address:
          <input type="text" />
        </label>
        <label>
          City:
          <input type="text" />
        </label>
        <label>
          Phone Number:
          <input type="text" />
        </label>
      </div>


      <button className="place-order-button" onClick={placeOrder}>Place Order</button>
    </div>
  );
};
export default Checkout;
