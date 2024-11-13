import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import plate from '../assets/plate.png';
import search from '../assets/search-icon-white.png';

const Navbar = ({ user, onSignOut }) => {
  return (
    <div className='navbar w-full flex items-center justify-between bg-[#fff] py-[15px] px-[7%]'>
      <Link to="/">
      <img src={plate} className="logo w-[60px] cursor-pointer mr-5" alt="logo" />
      </Link>
      <p className="main_page_title_text headings text-5xl font-custom mt-1">Campus Bytes</p>

      <ul className='flex list-none ml-auto mr-5 justify-between '>
        <li className='font-custom inline-block my-[10px] mx-[20px] text-[18px] cursor-pointer hover:bg-[#272727] hover:text-white rounded-md py-2 px-4 transition-colors hover:scale-110 transition-transform pt-3'>
          <Link to="/">Home</Link>
        </li>
        
        {user ? (
          <>
            <li className='font-custom inline-block my-[10px] mx-[20px] text-[18px] cursor-pointer hover:bg-[#272727] text-[#242424] hover:text-white rounded-md py-2 px-4 transition-colors hover:scale-110 transition-transform pt-3'>
              <button onClick={onSignOut} className="text-[18px] cursor-pointer bg-transparent border-0  hover:text-white">
                Logout
              </button>
            </li>
            <li className='font-semibold inline-block my-[10px] mx-[20px] text-[18px] pt-2.5 '>
              Welcome, {user.username}!
            </li>
          </>
        ) : (
          <>
            <li className='font-custom inline-block my-[10px] mx-[20px] text-[18px] cursor-pointer hover:bg-[#272727] hover:text-white rounded-md py-2 px-4 transition-colors hover:scale-110 transition-transform pt-3'>
              <Link to="/login">Login</Link>
            </li>
            <li className='font-custom inline-block my-[10px] mx-[20px] text-[18px] cursor-pointer hover:bg-[#272727] hover:text-white rounded-md py-2 px-4 transition-colors hover:scale-110 transition-transform pt-3'>
              <Link to="/signup">Sign Up</Link>
            </li>
          </>
        )}
      </ul>

      <div className='search-box flex items-center bg-[#242424] py-[5px] px-[20px] rounded-[50px]'>
        <input
          className='font-custom p-[6px] border-0 outline-0 bg-transparent text-[#fff] text-[18px] max-w-[200px] pt-3'
          type='text'
          placeholder='Search...'
        />
        <img className='w-[30px] cursor-pointer' src={search} alt="search icon" />
      </div>
    </div>
  );
};

export default Navbar;
