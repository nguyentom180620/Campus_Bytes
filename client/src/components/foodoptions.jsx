// components/FoodOptions.jsx
import React, { useState, useEffect } from 'react';
import RestaurantCard from './RestaurantCard';

const FoodOptions = () => {
  const [address, setAddress] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState('alphabetical-az');
  const [distanceMiles, setDistanceMiles] = useState(5); // Default to 5 miles
  const resultsPerPage = 15;

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      const locationQuery = `${address}, Gainesville, FL`;
      const distanceMeters = Math.round(distanceMiles * 1609.34); // Convert miles to meters and round

      const response = await fetch(
        `/api/foodoptions?location=${encodeURIComponent(locationQuery)}&radius=${distanceMeters}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch restaurants');
      }
      const data = await response.json();
      
      // Filter restaurants within the specified distance
      const filteredRestaurants = data.filter(
        (restaurant) => restaurant.distance <= distanceMeters
      );

      setRestaurants(sortRestaurants(filteredRestaurants, 'alphabetical-az')); // Default sorting
      setCurrentPage(1); // Reset to the first page after each search
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Sorting function
  const sortRestaurants = (restaurants, option) => {
    switch (option) {
      case 'alphabetical-az':
        return [...restaurants].sort((a, b) => a.name.localeCompare(b.name));
      case 'alphabetical-za':
        return [...restaurants].sort((a, b) => b.name.localeCompare(a.name));
      case 'rating-high-low':
        return [...restaurants].sort((a, b) => b.rating - a.rating);
      case 'rating-low-high':
        return [...restaurants].sort((a, b) => a.rating - b.rating);
      case 'distance-near-far':
        return [...restaurants].sort((a, b) => a.distance - b.distance);
      case 'distance-far-near':
        return [...restaurants].sort((a, b) => b.distance - a.distance);
      default:
        return restaurants;
    }
  };

  // Handle dropdown selection
  const handleSortChange = (e) => {
    const option = e.target.value;
    setSortOption(option);
    setRestaurants(sortRestaurants(restaurants, option));
  };

  // Pagination logic
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = restaurants.slice(indexOfFirstResult, indexOfLastResult);

  const totalPages = Math.ceil(restaurants.length / resultsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const goToPage = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="food-options-container text-center py-8 bg-gray-100 min-h-screen">
      <h2 className="text-4xl font-bold mb-8 text-gray-800">Find Food Options Near You</h2>

      {/* Search bar and controls */}
      <div className="flex items-center justify-center mb-6 gap-4">
        <input
          type="text"
          placeholder="Enter your address (default: Gainesville, FL)"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="p-2 rounded-lg border border-gray-300 w-64"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Search
        </button>

        {/* Sort dropdown */}
        {restaurants.length > 0 && (
          <div className="flex items-center">
            <label htmlFor="sort" className="text-lg font-medium mr-2">Sort by:</label>
            <select
              id="sort"
              value={sortOption}
              onChange={handleSortChange}
              className="p-2 border border-gray-300 rounded-lg"
            >
              <option value="alphabetical-az">Alphabetical (A-Z)</option>
              <option value="alphabetical-za">Alphabetical (Z-A)</option>
              <option value="rating-high-low">Rating (High to Low)</option>
              <option value="rating-low-high">Rating (Low to High)</option>
              <option value="distance-near-far">Distance (Near to Far)</option>
              <option value="distance-far-near">Distance (Far to Near)</option>
            </select>
          </div>
        )}
      </div>

      {/* Distance Range Slider in Whole Miles */}
      <div className="flex items-center justify-center mb-8">
        <label htmlFor="distance" className="text-lg font-medium mr-4">Max Distance: {distanceMiles} miles</label>
        <input
          type="range"
          id="distance"
          value={distanceMiles}
          onChange={(e) => setDistanceMiles(Number(e.target.value))}
          min={1} // Minimum 1 mile
          max={25} // Maximum 25 miles
          step={1} // Increment by 1 mile
          className="slider"
        />
      </div>

      {loading && <p>Loading food options...</p>}
      {error && <p>{error}</p>}

      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4">
        {currentResults.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>

      {/* Pagination Controls */}
      {restaurants.length > 0 && (
        <div className="pagination-controls flex justify-center items-center mt-8 space-x-4">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-200 disabled:bg-gray-200"
          >
            Previous
          </button>

          {/* Page Numbers */}
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index + 1)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-700'
              } hover:bg-blue-500 transition duration-200`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-200 disabled:bg-gray-200"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default FoodOptions;
