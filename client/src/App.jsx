import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import SignOut from './components/SignOut'; // Import SignOut component
import Navbar from './components/Navbar';

function App() {
  const [user, setUser] = useState(null); // User state

  const handleLogin = (userData) => {
    setUser(userData); // Set user data on login
  };

  const handleSignOut = () => {
    setUser(null); // Clear user data on sign out
  };

  return (
    <>
      <div className="div_flex_center">
        <p className="main_page_title_text headings">Campus Bytes</p>
      </div>

      <div className='w-[100vw] h-[100vh] bg-[#ced8ff]'>
        <Navbar/>
      </div>     

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

function HomePage() {
  return (
    <div className="main_page_header_box div_center">
      <p className="headings">Welcome to the Home Page!</p>
      <Link to="/login">Login Here</Link>
      <Link to="/signup">Signup Here</Link>
    </div>
  );
}

export default App;