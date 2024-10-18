// SignOut.js
import React from 'react';

function SignOut({ onSignOut }) {
  const handleSignOut = () => {
    // Clear user state or any relevant data
    onSignOut();
    // Optionally, redirect to the home page or login page
    window.location.href = '/'; // Redirects to the home page
  };

  return (
    <button onClick={handleSignOut}>
      Sign Out
    </button>
  );
}

export default SignOut;