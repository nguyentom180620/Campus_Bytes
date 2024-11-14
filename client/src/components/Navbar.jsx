import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import plate from '../assets/plate.png';
import search from '../assets/search-icon-white.png';

const Navbar = ({ user, onSignOut }) => {
  const not_implemented = () => {
    alert("Not Yet Implemented!");
  };
  return (
    <div className='navbar w-full flex items-center justify-between bg-[#fff] py-[15px] px-[7%]'>
      <Link to="/">
        <img src={plate} className="logo w-[60px] cursor-pointer mr-5" alt="logo" />
      </Link>
      <p className="main_page_title_text headings text-5xl font-custom mt-1">Campus Bytes</p>

      <ul className='flex list-none ml-auto mr-5 justify-between '>
        <li className=''>
          <Link to="/" className='font-custom inline-block my-[10px] mx-[20px] text-[21px] cursor-pointer hover:bg-[#272727] hover:text-white rounded-md py-2 px-4 transition-colors hover:scale-110 transition-transform pt-3' >Home</Link>
        </li>

        {user ? (
          <>
            <li className=''>
              <button onClick={onSignOut} className="font-custom inline-block my-[10px] mx-[20px] text-[21px] cursor-pointer hover:bg-[#272727] text-[#242424] hover:text-white rounded-md py-2 px-4 transition-colors hover:scale-110 transition-transform pt-3">
                Logout
              </button>
            </li>
            <li className='font-semibold inline-block my-[10px] mx-[20px] text-[21px] pt-2.5 '>
              Welcome, {user.username}!
            </li>
          </>
        ) : (
          <>
            <li className=''>
              <Link to="/login" className='font-custom inline-block my-[10px] mx-[20px] text-[21px] cursor-pointer hover:bg-[#272727] hover:text-white rounded-md py-2 px-4 transition-colors hover:scale-110 transition-transform pt-3'>Login</Link>
            </li>
            <li className=''>
              <Link to="/signup" className='font-custom inline-block my-[10px] mx-[20px] text-[21px] cursor-pointer hover:bg-[#272727] hover:text-white rounded-md py-2 px-4 transition-colors hover:scale-110 transition-transform pt-3'>Sign Up</Link>
            </li>
          </>
        )}
      </ul>

      <div className='search-box flex items-center bg-[#333333] py-[5px] px-[20px] rounded-[8px] '>
        <input
          className='font-custom p-[6px] border-0 outline-0 bg-transparent text-[#fff] text-[16px] max-w-[200px] pt-3'
          type='text'
          placeholder='Search...'
        />
        <img className='w-[30px] cursor-pointer' src={search} alt="search icon" onClick={not_implemented}/>
      </div>
    </div>
  );
};

export default Navbar;
