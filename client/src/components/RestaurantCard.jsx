// components/RestaurantCard.jsx
import React, { useState } from 'react';
import HoursPopover from './HoursPopover';

const RestaurantCard = ({ restaurant }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => setShowDetails(!showDetails);

  return (
    <>
      <div onClick={toggleDetails} className="restaurant-card bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 cursor-pointer">
        <img src={restaurant.image_url} alt={restaurant.name} className="w-full h-48 object-cover rounded-lg mb-4" />
        <h3 className="text-2xl font-semibold mb-2 text-gray-900">{restaurant.name}</h3>
        <p className="text-gray-600 mb-2">{restaurant.location.address1}, {restaurant.location.city}</p>
        <p className="text-yellow-500 font-semibold">Rating: {restaurant.rating} / 5 ⭐</p>
      </div>

      {showDetails && (
        <div className="modal fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="modal-content bg-white rounded-lg shadow-lg p-6 relative max-w-lg w-full">
            <button onClick={toggleDetails} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4">{restaurant.name}</h2>
            <p>{restaurant.location.address1}, {restaurant.location.city}</p>
            <p>Rating: {restaurant.rating} / 5 ⭐</p>
            <p>Phone: {restaurant.display_phone || 'N/A'}</p>
            <p><HoursPopover hours={restaurant.business_hours} /></p>
            <a href={restaurant.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mt-2 inline-block">Visit Website</a>
          </div>
        </div>
      )}
    </>
  );
};

export default RestaurantCard;
