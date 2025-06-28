import React, { useEffect, useState } from "react";
import "./Cart.css";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const handlebuy=()=>{
        navigate('/buy');
  }
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, []);

    const handleRemove = (indexToRemove) => {
    const updatedCart = cartItems.filter((_, index) => index !== indexToRemove);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  return (
    <div className="cart-container">
      {cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        cartItems.map((item, index) => (
          <div key={index} className="cart-item">
            <img src={item.image} alt={item.name} width={100} />
            <div>
              <h3>{item.name}</h3>
              <p>₹{item.price}</p>
              <button onClick={() => handleRemove(index)}>Remove</button>
            </div>
          </div>
        ))
      )}
      <button className="buy" onClick={handlebuy}>Buy Now</button>
    </div>
  );
}

export default Cart;
