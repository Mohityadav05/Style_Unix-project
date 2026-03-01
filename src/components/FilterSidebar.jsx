import React from "react";
import "./FilterSidebar.css";

const FilterSidebar = ({
  selectedPriceRange,
  setSelectedPriceRange,
  selectedSize,
  setSelectedSize,
  availableSizes = ["S", "M", "L", "XL", "XXL"],
  availablePrices = [
    { label: "Any Price", value: "all" },
    { label: "Under ₹500", value: "0-500" },
    { label: "₹500 - ₹1000", value: "500-1000" },
    { label: "₹1000 - ₹2000", value: "1000-2000" },
    { label: "₹2000 - ₹5000", value: "2000-5000" },
  ]
}) => {
  const handleClearFilters = () => {
    setSelectedPriceRange("all");
    setSelectedSize("all");
  };

  return (
    <aside className="filter-sidebar">
      <div className="filter-header">
        <h3>Filters</h3>
        {(selectedPriceRange !== "all" || selectedSize !== "all") && (
          <button className="clear-filters-btn" onClick={handleClearFilters}>
            Clear All
          </button>
        )}
      </div>

      <div className="filter-group">
        <h4 className="filter-label">Price Range</h4>
        <div className="filter-options-list">
          {availablePrices.map((price) => (
            <div
              key={price.value}
              className={`filter-option-item ${selectedPriceRange === price.value ? 'active' : ''}`}
              onClick={() => setSelectedPriceRange(price.value)}
            >
              <div className="radio-circle"></div>
              <span>{price.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <h4 className="filter-label">Size</h4>
        <div className="size-grid-selection">
          <div
            className={`size-option-box ${selectedSize === "all" ? 'active' : ''}`}
            onClick={() => setSelectedSize("all")}
          >
            All
          </div>
          {availableSizes.map((size) => (
            <div
              key={size}
              className={`size-option-box ${selectedSize === size ? 'active' : ''}`}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </div>
          ))}
        </div>
      </div>

      <div className="filter-footer">
        <p>Refine your selection for the perfect match.</p>
      </div>
    </aside>
  );
};

export default FilterSidebar;
