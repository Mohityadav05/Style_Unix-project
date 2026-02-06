import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Search() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/products/search?q=${query}`)
      .then((res) => res.json())
      .then((data) => setResults(data));
  }, [query]);

  return (
    <div>
      <h2>Search Results for "{query}"</h2>
      {results.map((item, i) => (
        <div key={i}>
          <h4>{item.productName}</h4>
          <p>₹{item.price}</p>
        </div>
      ))}
    </div>
  );
}

export default Search;
