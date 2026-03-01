import React, { useEffect, useState } from "react";
import "./Footwear.css";
import { useNavigate } from "react-router-dom";
import FilterSidebar from "./FilterSidebar";

function Footwear() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [selectedSize, setSelectedSize] = useState("all");

  const isLoggedIn = !!localStorage.getItem("token");

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
    fetch(`/api/products?category=footwear`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch footwear products");
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch((err) => console.error("Failed to fetch footwear:", err));
  }, []);

  const filteredProducts = products.filter((product) => {
    const price = product.price;
    const size = product.size?.toString().toLowerCase();

    const matchesPrice =
      selectedPriceRange === "all" ||
      (selectedPriceRange === "0-500" && price <= 500) ||
      (selectedPriceRange === "500-1000" && price > 500 && price <= 1000) ||
      (selectedPriceRange === "1000-2000" && price > 1000 && price <= 2000);

    const matchesSize =
      selectedSize === "all" ||
      (size && size === selectedSize.toLowerCase());

    return matchesPrice && matchesSize;
  });

  return (
    <div className="footwear-container">
      <FilterSidebar
        selectedPriceRange={selectedPriceRange}
        setSelectedPriceRange={setSelectedPriceRange}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
        availableSizes={["6", "7", "8", "9", "10"]}
      />

      <div className="product-container">
        {filteredProducts.length === 0 ? (
          <p>No footwear found for selected filters.</p>
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
              <p>Size: {product.size || "N/A"}</p>
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

export default Footwear;
