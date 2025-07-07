import React, { useEffect, useState } from "react";
import "./WomensCloth.css";
import { useNavigate } from "react-router-dom";

function WomensCloth() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [selectedSize, setSelectedSize] = useState("all");

  const isLoggedIn = localStorage.getItem("token");

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
    fetch("https://backend-gy4y.onrender.com/api/products?category=womendress")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch women's products");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching women's products:", err);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter((product) => {
    const price = product.price;
    const size = product.size;

    const priceMatch =
      selectedPriceRange === "all" ||
      (selectedPriceRange === "0-500" && price <= 500) ||
      (selectedPriceRange === "500-1000" && price > 500 && price <= 1000) ||
      (selectedPriceRange === "1000-2000" && price > 1000 && price <= 2000);

    const sizeMatch =
      selectedSize === "all" ||
      String(size).toLowerCase() === selectedSize.toLowerCase();

    return priceMatch && sizeMatch;
  });

  return (
    <div className="womens-cloth">
      <div className="filter-container">
        <button className="home" onClick={() => navigate("/")}>Home</button>

        <select
          className="filter-dropdown"
          value={selectedPriceRange}
          onChange={(e) => setSelectedPriceRange(e.target.value)}
        >
          <option value="all">Filter by Price</option>
          <option value="0-500">₹0 - ₹500</option>
          <option value="500-1000">₹500 - ₹1000</option>
          <option value="1000-2000">₹1000 - ₹2000</option>
        </select>

        <select
          className="filter-dropdown"
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
        >
          <option value="all">Filter by Size</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
          <option value="Free Size">Free Size</option>
        </select>

        <button className="home" onClick={() => navigate("/cart")}>Go to Cart</button>
      </div>

      <div className="product-container">
        {loading ? (
          <p>Loading women’s clothing...</p>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <div className="product-item" key={index}>
              <img
                src={product.image}
                alt={product.productName}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/placeholder.png";
                }}
              />
              <h3>{product.productName}</h3>
              <p>₹{product.price}</p>
              <p>Size: {product.size}</p>
              <button className="add-to-cart" onClick={() => handleAddToCart(product)}>
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p>No women's clothing found for selected filters.</p>
        )}
      </div>
    </div>
  );
}

export default WomensCloth;
