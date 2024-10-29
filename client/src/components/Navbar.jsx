import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import plate from '../assets/plate.png';
import search from '../assets/search-icon-white.png';

const Navbar = ({ user, onSignOut }) => {
  return (
    <div className='navbar w-full flex items-center justify-between bg-[#fff] py-[15px] px-[7%]'>
      <img src={plate} className="logo w-[60px] cursor-pointer mr-20" alt="logo" />

      <ul className='flex-1 list-none'>
        <li className='inline-block my-[10px] mx-[20px] text-[18px] cursor-pointer'>
          <Link to="/">Home</Link>
        </li>
        
        {user ? (
          <>
            <li className='inline-block my-[10px] mx-[20px] text-[18px] cursor-pointer'>
              Welcome, {user.username}!
            </li>
            <li className='inline-block my-[10px] mx-[20px] text-[18px] cursor-pointer'>
              <button onClick={onSignOut} className="text-[18px] cursor-pointer bg-transparent border-0 text-[#242424]">
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li className='inline-block my-[10px] mx-[20px] text-[18px] cursor-pointer'>
              <Link to="/login">Login</Link>
            </li>
            <li className='inline-block my-[10px] mx-[20px] text-[18px] cursor-pointer'>
              <Link to="/signup">Sign Up</Link>
            </li>
          </>
        )}
      </ul>

      <div className='search-box flex items-center bg-[#242424] py-[10px] px-[20px] rounded-[50px]'>
        <input
          className='p-[6px] border-0 outline-0 bg-transparent text-[#fff] text-[18px] max-w-[200px]'
          type='text'
          placeholder='Search...'
        />
        <img className='w-[20px] cursor-pointer' src={search} alt="search icon" />
      </div>
    </div>
  );
};

export default Navbar;
