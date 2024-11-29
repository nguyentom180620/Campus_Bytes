import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Reset error message

    try {
      const response = await fetch('http://localhost:5050/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid username or password');
      }

      const data = await response.json();
      onLogin(data.user); // Assuming your server sends user data on successful login

      navigate('/'); // Redirect to the home page after login
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="login-page-container flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-indigo-300">
      <div className="form-container bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6 cursor-default">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-medium mb-2 cursor-default">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2 cursor-default">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {errorMessage && <p className="text-red-600 text-sm mb-4">{errorMessage}</p>}
          <a href="/signup" className='block text-left text-black text-sm mt-1 hover:text-blue-500 transition duration-200 hover:underline'>Don't have an account?</a>
          <button
            type="submit"
            className="mt-2 w-full bg-blue-600 text-white py-2 rounded-md text-lg font-medium transition duration-200 hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
