import React, { useEffect, useState } from "react";
import "./Accessories.css";
import { useNavigate } from "react-router-dom";

function Accessories() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [selectedSize, setSelectedSize] = useState("all");

  const isLoggedIn = !!localStorage.getItem("token");

  const handleAddToCart = (product) => {
    if (!isLoggedIn) {
      alert("Please login to add items to the cart.");
      navigate("/login");
      return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.productName} added to cart`);
  };

  useEffect(() => {
    fetch("https://backend-gy4y.onrender.com/api/products?category=accessories")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Failed to load accessories:", err));
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesPrice =
      selectedPriceRange === "all" ||
      (selectedPriceRange === "0-500" && product.price <= 500) ||
      (selectedPriceRange === "500-1000" && product.price > 500 && product.price <= 1000) ||
      (selectedPriceRange === "1000-2000" && product.price > 1000 && product.price <= 2000) ||
      (selectedPriceRange === "2000-5000" && product.price > 2000 && product.price <= 5000);

    const matchesSize =
      selectedSize === "all" || product.size?.toLowerCase() === selectedSize.toLowerCase();

    return matchesPrice && matchesSize;
  });

  return (
    <div className="accessories-container">
      <div className="filter-container">
        <button className="home" onClick={() => navigate("/")}>Home</button>

        <select
          className="filter-dropdown"
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
        >
          <option value="all">Filter by Size</option>
          <option value="S">Small (S)</option>
          <option value="M">Medium (M)</option>
          <option value="L">Large (L)</option>
          <option value="Universal">Universal</option>
        </select>

        <select
          className="filter-dropdown"
          value={selectedPriceRange}
          onChange={(e) => setSelectedPriceRange(e.target.value)}
        >
          <option value="all">Filter by Price</option>
          <option value="0-500">₹0 - ₹500</option>
          <option value="500-1000">₹500 - ₹1000</option>
          <option value="1000-2000">₹1000 - ₹2000</option>
          <option value="2000-5000">₹2000 - ₹5000</option>
        </select>

        <button className="home" onClick={() => navigate("/cart")}>Go to Cart</button>
      </div>

      <div className="product-container">
        {filteredProducts.length === 0 ? (
          <p>No accessories found with selected filters.</p>
        ) : (
          filteredProducts.map((product, index) => (
            <div className="product-item" key={index}>
              <img src={product.image} alt={product.productName} />
              <h3>{product.productName}</h3>
              <p>₹{product.price}</p>
              <p>Size: {product.size}</p>
              <button
                className="add-to-cart-button"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Accessories;
