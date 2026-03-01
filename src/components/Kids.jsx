import React, { useEffect, useState } from "react";
import "./Kids.css";
import { useNavigate } from "react-router-dom";
import FilterSidebar from "./FilterSidebar";

function Kids() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [selectedSize, setSelectedSize] = useState("all");

  const isLoggedIn = localStorage.getItem("token");

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
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

  const handleProductClick = (productId) => {
    if (productId) {
      navigate(`/product/${productId}`);
    }
  };

  useEffect(() => {
    fetch(`/api/products?category=kids`)
      .then((res) => {
        if (!res.ok) throw new Error("Network error");
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error loading kids products:", err));
  }, []);

  const filteredProducts = products.filter((product) => {
    const price = product.price;
    const size = product.size;

    const matchesPrice =
      selectedPriceRange === "all" ||
      (selectedPriceRange === "0-500" && price <= 500) ||
      (selectedPriceRange === "500-1000" && price > 500 && price <= 1000) ||
      (selectedPriceRange === "1000-2000" && price > 1000 && price <= 2000);

    const matchesSize =
      selectedSize === "all" ||
      String(size).toLowerCase() === selectedSize.toLowerCase();

    return matchesPrice && matchesSize;
  });

  return (
    <div className="kids-container">
      <FilterSidebar
        selectedPriceRange={selectedPriceRange}
        setSelectedPriceRange={setSelectedPriceRange}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
        availableSizes={["S", "M", "L", "XL", "Free Size"]}
      />

      <div className="product-container">
        {filteredProducts.length === 0 ? (
          <p>No kids products match your filters.</p>
        ) : (
          filteredProducts.map((product) => (
            <div
              className="product-item"
              key={product._id}
              onClick={() => handleProductClick(product._id)}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={product.image}
                alt={product.productName}
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/placeholder.png";
                }}
                style={{ minHeight: '200px', backgroundColor: '#f0f0f0' }}
              />
              <h3>{product.productName}</h3>
              <p>₹{product.price}</p>
              <p>Size: {product.size}</p>
              <button className="add-to-cart" onClick={(e) => handleAddToCart(e, product)}>
                Add to Cart
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Kids;
