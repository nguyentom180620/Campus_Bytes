// App.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import FoodOptions from './components/FoodOptions';
import About from './components/About';
import Contacts from './components/Contacts';
import homePic from './assets/homepage_pic2.jpg';
import homePic2 from './assets/dining_hall.png';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Retrieve user data from localStorage on initial load
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/'); // Redirect to the home page after logging out
  };

  return (
    <>
      <Navbar user={user} onSignOut={handleSignOut} />

      <Routes>
        <Route path="/" element={<HomePage user={user} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/foodoptions" element={<FoodOptions />} />
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
      </Routes>
    </>
  );
}

function HomePage({ user }) {
  return (
    
    <div className="relative w-full min-h-screen">
    {/* Background Image */}
    {user ? (<img
      src={homePic2}
      alt="Campus Bytes Background"
      className="absolute w-full h-full object-cover"
    />
    ) :(
      <img
      src={homePic}
      alt="Campus Bytes Background"
      className="absolute w-full h-full object-cover"
    />
    )}
    

    {/* Overlay for welcome message */}
    <div className="relative z-10 flex items-center justify-center h-full">
      {user ? (
        <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg max-w-sm m-10">
          <p className="font-custom text-2xl font-semibold text-gray-800 mb-4">Welcome, {user.username}!</p>
          <Link
            to="/foodoptions"
            className="mt-4 inline-block bg-orange-500 text-white px-6 py-3 rounded-md font-medium text-lg hover:bg-orange-600 transition duration-200"
          >
            See Food Options
          </Link>
        </div>
      ) : (
        <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg max-w-sm m-10">
          <p className="font-custom text-2xl font-semibold text-gray-800 mb-4 cursor-default">Welcome to Campus Bytes!</p>
          <div className="flex flex-col items-stretch gap-4">
            <Link
              to="/login"
              className="login-button px-6 py-3 rounded-md bg-[#4395b1] text-white text-lg font-medium transition duration-200 hover:bg-[#86898a] text-center"
            >
              Login Here
            </Link>
            <Link
              to="/signup"
              className="signup-button px-6 py-3 rounded-md bg-[#4ba06b] text-white text-lg font-medium transition duration-200 hover:bg-[#86898a] text-center"
            >
              Signup Here
            </Link>
          </div>
        </div>
      )}
    </div>
  </div>
  );
}

export default App;
