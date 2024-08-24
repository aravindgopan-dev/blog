import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";


function Header() {
  return (
    <div className="navbar bg-base-100 border-b border-neutral-content ">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle" aria-label="Menu">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li><Link to="/" className="text-gray-400 hover:text-blue-500" >Home</Link></li>
            <li><Link to="/about" className="text-gray-400 hover:text-blue-500">About</Link></li>
            <li><Link to="/sign-in" className="text-gray-400 hover:text-blue-500">Sign-in</Link></li>
            <li><Link to="/sign-up" className="text-gray-400 hover:text-blue-500">Sign-up</Link></li>
            
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost text-xl hover:text-blue-500">daisyUI</a>
      </div>
      <div className="navbar-end">
        <input
          type="text"
          placeholder="Search"
          aria-label="Search"
          className="input input-bordered h-[35px] w-24 md:w-auto"
        />
        <button className='ml-3 hover:text-blue-500' aria-label="Search Button"><FaSearch /></button>
        
      </div>
    </div>
  );
}

export default Header;
