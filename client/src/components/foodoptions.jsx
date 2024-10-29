// components/FoodOptions.jsx
import React, { useState, useEffect } from 'react';

const FoodOptions = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/foodoptions'); // Use backend route

        if (!response.ok) {
          throw new Error('Failed to fetch restaurants');
        }

        const data = await response.json();
        setRestaurants(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  if (loading) return <p>Loading food options...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="food-options-container text-center py-8 bg-gray-100 min-h-screen">
      <h2 className="text-4xl font-bold mb-8 text-gray-800">Food Options Near You</h2>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4">
        {restaurants.map((restaurant) => (
          <div key={restaurant.id} className="restaurant-card bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
            <img src={restaurant.image_url} alt={restaurant.name} className="w-full h-48 object-cover rounded-lg mb-4" />
            <h3 className="text-2xl font-semibold mb-2 text-gray-900">{restaurant.name}</h3>
            <p className="text-gray-600 mb-2">{restaurant.location.address1}, {restaurant.location.city}</p>
            <p className="text-yellow-500 font-semibold">Rating: {restaurant.rating} / 5 ⭐</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodOptions;
