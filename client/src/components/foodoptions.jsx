// components/FoodOptions.jsx
import React from 'react';

const FoodOptions = () => {
  return (
    <div className="food-options-container text-center py-8">
      <h2 className="text-3xl font-semibold mb-6">Food Options</h2>
      <p className="text-lg text-gray-700">Here is a list of delicious food options on campus!</p>
      {/* Placeholder for food options list */}
      <ul className="mt-4">
        <li>Pizza</li>
        <li>Burgers</li>
        <li>Salads</li>
        <li>Sandwiches</li>
        <li>Sushi</li>
        {/* Add more food options as needed */}
      </ul>
    </div>
  );
};

export default FoodOptions;
