import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductDetail.css";

function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedSizes, setSelectedSizes] = useState([]); // Array for multi-selection
    const [quantity, setQuantity] = useState(1);

    const isLoggedIn = !!localStorage.getItem("token");

    useEffect(() => {
        fetch(`/api/products/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error("Product not found");
                return res.json();
            })
            .then((data) => {
                setProduct(data);
                setLoading(false);

                // Auto-select size logic
                const availableSizes = getAvailableSizes(data);
                if (availableSizes.length === 1) {
                    setSelectedSizes([availableSizes[0]]);
                } else if (data.category === "accessories") {
                    setSelectedSizes(["Standard"]);
                }
            })
            .catch((err) => {
                console.error("Error fetching product:", err);
                setLoading(false);
            });
    }, [id]);

    const getAvailableSizes = (prod) => {
        if (!prod) return [];

        const category = prod.category?.toLowerCase();

        // Standard ranges for professional appearance
        const clothingSizes = ["S", "M", "L", "XL", "XXL"];
        const footwearSizes = ["7", "8", "9", "10", "11"];
        const softToySizes = ["Small", "Medium", "Giant"];
        const bagSizes = ["Small", "Medium", "Large"];

        // 1. Always prioritize full ranges for common categories
        if (["men-clothing", "womendress", "kids", "summer", "winter"].includes(category)) {
            return clothingSizes;
        }

        if (category === "footwear") {
            return footwearSizes;
        }

        if (category === "bags") {
            return bagSizes;
        }

        if (category === "soft-toys") {
            return softToySizes;
        }

        // 2. Fallback to DB sizes if it's a unique category
        if (prod.sizes && prod.sizes.length > 0) return prod.sizes;
        if (prod.size) return [prod.size];

        if (category === "accessories") {
            return ["Standard"];
        }

        return [];
    };

    const toggleSize = (size) => {
        setSelectedSizes((prev) => {
            if (prev.includes(size)) {
                return prev.filter((s) => s !== size);
            } else {
                return [...prev, size];
            }
        });
    };

    const handleAddToCart = () => {
        if (!isLoggedIn) {
            alert("Please login to add items to the cart.");
            navigate("/login");
            return;
        }

        const availableSizes = getAvailableSizes(product);
        if (selectedSizes.length === 0 && availableSizes.length > 0) {
            alert("Please select at least one size.");
            return;
        }

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Add each selected size as a separate item
        selectedSizes.forEach((size) => {
            const cartItem = {
                ...product,
                selectedSize: size,
                quantity,
            };
            cart.push(cartItem);
        });

        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${selectedSizes.length} variant(s) of ${product.productName} added to cart!`);
    };

    if (loading) return <div className="loading-state">Loading product details...</div>;
    if (!product) return <div className="error-state">Product not found.</div>;

    const sizes = getAvailableSizes(product);

    return (
        <div className="product-detail-container">
            <div className="product-detail-wrapper">
                <div className="product-image-section">
                    <button className="back-button" onClick={() => navigate(-1)}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="19" y1="12" x2="5" y2="12"></line>
                            <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                        Back
                    </button>
                    <div className="main-image-wrapper">
                        <img src={product.image} alt={product.productName} />
                    </div>
                </div>

                <div className="product-info-section">
                    <div className="product-header">
                        <span className="category-tag">{product.category}</span>
                        <h1>{product.productName}</h1>
                        <p className="product-price">₹{product.price}</p>
                    </div>

                    <div className="product-description">
                        <h3>Description</h3>
                        <p>{product.description || "High-quality product designed for style and comfort. Perfect for everyday use or special occasions."}</p>
                    </div>

                    {sizes.length > 0 && (
                        <div className="size-selector">
                            <h3>Select Size (Choose Multiple)</h3>
                            <div className="size-options">
                                {sizes.map((size) => (
                                    <button
                                        key={size}
                                        className={`size-btn ${selectedSizes.includes(size) ? "active" : ""}`}
                                        onClick={() => toggleSize(size)}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="delivery-info">
                        <div className="delivery-item">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="1" y="3" width="15" height="13"></rect>
                                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                                <circle cx="5.5" cy="18.5" r="2.5"></circle>
                                <circle cx="18.5" cy="18.5" r="2.5"></circle>
                            </svg>
                            <div>
                                <p className="info-title">Free Delivery</p>
                                <p className="info-subtitle">Usually within 3-5 business days</p>
                            </div>
                        </div>
                        <div className="delivery-item">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.5 8.5 0 0 1 7.6 4.5"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                            <div>
                                <p className="info-title">Authentic Product</p>
                                <p className="info-subtitle">100% genuine quality assured</p>
                            </div>
                        </div>
                    </div>

                    <div className="action-buttons">
                        <button className="add-cart-btn" onClick={handleAddToCart}>
                            Add {selectedSizes.length > 0 ? selectedSizes.length : ""} to Cart
                        </button>
                        <button className="wishlist-btn" onClick={() => alert("Added to Wishlist!")}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.84-8.84 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
