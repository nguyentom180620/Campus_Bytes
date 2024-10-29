import React, { useState } from 'react';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState(''); // Add email state
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5050/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }), // Include email in the request
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message);
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (err) {
      setError('Signup failed');
    }
  };

  return (
    <div className="signup-page-container flex items-center justify-center min-h-screen bg-gradient-to-r from-green-200 to-teal-300">
      <div className="form-container bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Sign Up</h2>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-medium mb-2">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Username"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Email"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Password"
            />
          </div>
          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md text-lg font-medium transition duration-200 hover:bg-green-700"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
