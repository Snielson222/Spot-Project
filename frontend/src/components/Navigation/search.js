import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"; // Import Link from React Router

export default function SearchNav() {
  const [searchQuery, setSearchQuery] = useState("");

  const spots = useSelector((state) => state.spots);

  const filteredSpots = Object.values(spots).filter((spot) =>
    spot.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    // Optional: Perform any action with the searchQuery, such as fetching data from the backend
    console.log("Search query:", searchQuery);
    // Reset the searchQuery state after submission (optional)
    setSearchQuery("");
  };

  return (
    <div className="searchNav">
      <label className="searchLabel">
        Where
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Search destinations"
            className="searchInput"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button id="searchButton" type="submit">
            <i className="fa fa-search" aria-hidden="true"></i> Search
          </button>
        </form>
      </label>
      
      {searchQuery && (
        <div style={{ textDecoration: 'none' }} className="filteredResults">
          {filteredSpots.map((spot) => (
            <div key={spot.id}>
              
              <Link style={{ textDecoration: 'none' }} to={`/spots/${spot.id}`}>
                <h5>{spot.name}</h5>
               
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
