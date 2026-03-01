import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./Search.css";

function Search() {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get("q");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const isLoggedIn = localStorage.getItem("token");

  useEffect(() => {
    if (query) {
      setLoading(true);
      fetch(`/api/products/search?q=${query}`)
        .then((res) => res.json())
        .then((data) => {
          setResults(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Search error:", err);
          setLoading(false);
        });
    }
  }, [query]);

  const handleProductClick = (productId) => {
    if (productId) {
      navigate(`/product/${productId}`);
    }
  };

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

  return (
    <div className="search-page">
      <Navbar />
      <div className="search-results-container">
        <header className="search-header">
          <h1>Search Results</h1>
          <p>{results.length} results found for "<strong>{query}</strong>"</p>
        </header>

        {loading ? (
          <div className="search-loading">Searching for products...</div>
        ) : (
          <div className="product-container">
            {results.length > 0 ? (
              results.map((product) => (
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
                  />
                  <h3>{product.productName}</h3>
                  <p>₹{product.price}</p>
                  <button
                    className="add-to-cart"
                    onClick={(e) => handleAddToCart(e, product)}
                  >
                    Add to Cart
                  </button>
                </div>
              ))
            ) : (
              <div className="no-results">
                <h3>No products found matching your search.</h3>
                <p>Try checking your spelling or using more general terms.</p>
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Search;
