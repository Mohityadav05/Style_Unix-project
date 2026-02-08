import React, { useEffect, useState } from 'react';
import './Payment.css';

function Payment() {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalAmount = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);
    setTotal(totalAmount);
  }, []);

  const handlePayment = () => {
    alert('Payment Successful!');
    localStorage.removeItem('cart');
    window.location.href = '/'; 
  };

  return (
    <div className="payment-body">
      <div className="payment-container">
        <h2>Payment Page</h2>
        <p>Thank you for your purchase!</p>
        <div className="payment-summary">
          <p>Total: ₹{total.toFixed(2)}</p>
        </div>
        <button className="pay-now" onClick={handlePayment}>
          Pay Now
        </button>
      </div>
    </div>
  );
}

export default Payment;
