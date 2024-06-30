import React from "react";
import Login from "./Login";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import Logout from "./Logout";

function Navbar() {
  const [authUser, setAuthUser] = useAuth();

  return (
    <div className="fixed top-0 left-0 right-0">
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Home</a>
              </li>
              <li>
                <a>About Us</a>
              </li>
              <li>
                <a>Contact Us</a>
              </li>
              <li>
                <a>Dashboard</a>
              </li>
              <li>
                <a>Calculator</a>
              </li>
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost text-xl">ArthChitra</Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/calculator">Calculator</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <div className="px-4">
            {authUser ? (
              <Logout />
            ) : (
              <div>
                <a
                  className="btn bg-slate-950 hover:bg-slate-800"
                  onClick={() =>
                    document.getElementById("my_modal_2").showModal()
                  }
                >
                  Login
                </a>
                <Login />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
