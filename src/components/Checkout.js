import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
          amount,
          orderId,
          description,
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

  return (
    <div>
      <h2>Checkout</h2>
      <label>
        Payment Method:
        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
          <option value="COD">Cash on Delivery</option>
          <option value="JazzCash">JazzCash</option>
          <option value="Easypaisa">Easypaisa</option>
        </select>
      </label>
      <button onClick={handlePayment}>Proceed to Payment</button>
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
