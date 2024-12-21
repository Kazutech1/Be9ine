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
     
      <div className="navbar-end">
        <Link
          to="/login"
          className="btn btn-primary normal-case text-lg rounded-lg px-4"
        >
          Log xdtcfhkjIn
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
