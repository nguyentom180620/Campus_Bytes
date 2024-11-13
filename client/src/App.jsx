// App.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import FoodOptions from './components/FoodOptions'; // Import the new FoodOptions component
import About from './components/About';

function App() {
  const [user, setUser] = useState(null); // User state

  // Retrieve user data from localStorage on initial load
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser)); // Parse and set saved user
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData); // Set user data on login
    localStorage.setItem('user', JSON.stringify(userData)); // Save user data in localStorage
  };

  const handleSignOut = () => {
    setUser(null); // Clear user data on sign out
    localStorage.removeItem('user'); // Remove user data from localStorage
  };

  return (
    <>
      {/* <div className="div_flex_center">
        <p className="main_page_title_text headings">Campus Bytes</p>
      </div> */}

      <Navbar user={user} onSignOut={handleSignOut} />

      <Routes>
        <Route path="/" element={<HomePage user={user} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/foodoptions" element={<FoodOptions />} /> {/* Add new route for food options */}
        <Route path="/About" element={<About />} />
      </Routes>
    </>
  );
}

function HomePage({ user }) {
  return (
    <div className="home-page-container w-full min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 to-indigo-300">
      <div className="text-center">
        <p className="text-4xl font-semibold text-gray-800 mb-6">Welcome to the Home Page!</p>
        {user ? (
          <>
            <p className="text-xl text-gray-600">Welcome, {user.username}!</p>
            <Link
              to="/foodoptions"
              className="mt-4 inline-block bg-orange-500 text-white px-6 py-3 rounded-full font-medium text-lg hover:bg-orange-600 transition duration-200"
            >
              See Food Options
            </Link>
          </>
        ) : (
          <div className="flex flex-col items-center gap-4 mt-4">
            <Link to="/login" className="login-button px-6 py-3 rounded-full bg-blue-600 text-white text-lg font-medium transition duration-200 hover:bg-blue-700">
              Login Here
            </Link>
            <Link to="/signup" className="signup-button px-6 py-3 rounded-full bg-green-600 text-white text-lg font-medium transition duration-200 hover:bg-green-700">
              Signup Here
            </Link>
          </div>
        )}
      </div>
    </div> 
  );
}

export default App;
