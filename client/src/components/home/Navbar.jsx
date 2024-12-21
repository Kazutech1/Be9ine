import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar bg-base-100 shadow-md px-4 md:px-8">
      <div className="navbar-start">
        <Link to="/" className="text-2xl font-bold text-primary">
          Be 9ine
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="#home" className="text-lg hover:text-primary">
              Home
            </Link>
          </li>
          <li>
            <Link to="#markets" className="text-lg hover:text-primary">
              Markets
            </Link>
          </li>
          <li>
            <Link to="#portfolio" className="text-lg hover:text-primary">
              Portfolio
            </Link>
          </li>
          <li>
            <Link to="#about" className="text-lg hover:text-primary">
              About
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <Link
          to="/login"
          className="btn btn-primary normal-case text-lg rounded-lg px-4"
        >
          Log In
        </Link>
      </div>
      <div className="dropdown lg:hidden navbar-end">
        <label tabIndex={0} className="btn btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </label>
        <ul
          tabIndex={0}
          className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <Link to="#home" className="hover:text-primary">
              Home
            </Link>
          </li>
          <li>
            <Link to="#markets" className="hover:text-primary">
              Markets
            </Link>
          </li>
          <li>
            <Link to="#portfolio" className="hover:text-primary">
              Portfolio
            </Link>
          </li>
          <li>
            <Link to="#about" className="text-primary">
              About
            </Link>
          </li>
        </ul>
        <Link to="/login" className="btn btn-primary mt-2">
          Log In
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
