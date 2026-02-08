import React, { useState } from 'react';
import './Buy.css';
import { useNavigate } from 'react-router-dom';

function Buy() {
  const navigate = useNavigate();
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const handlepayment=()=>{
    navigate('/payment');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setOrderConfirmed(true);
  };

  return (
    <div className="buy-body">
      <div className="buy-container">
        <h2>Checkout Form</h2>
        {!orderConfirmed ? (
          <form className="buy-form" onSubmit={handleSubmit}>
            <input type="text" placeholder="Full Name" required />
            <input type="text" placeholder="Address" required />
            <input type="email" placeholder="Email" required />
            <input type="tel" placeholder="Phone Number" required />
            <input type="number" placeholder="Pin Code" required />
            <button type="submit">Confirm Order</button>
          </form>
        ) : (
          <div className="confirmation">
            <p>Order confirmed! Please proceed to payment.</p>
            <button className="proceed-button" onClick={handlepayment}>Proceed to Pay</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Buy;
