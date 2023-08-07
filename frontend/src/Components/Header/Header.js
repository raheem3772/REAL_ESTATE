import React from "react";
import "./Header.css";
import { Button } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
const Header = ({ token }) => {
  const navigate = useNavigate();
  return (
    <div className="headerMain">
      <h2>REAL ESTATE</h2>
      <div className="navLinks">
        <div>
          <NavLink to="home">Home</NavLink>
          {/* <NavLink to='home'>Register</NavLink> */}
          <NavLink to="agency">Agency</NavLink>
          <NavLink to="blogs">Blogs</NavLink>
          <NavLink to="about">About</NavLink>
        </div>
        {token === null ? (
          <button className="btnHover" onClick={() => navigate("/signup")}>
            Register/Login
          </button>
        ) : (
          <button
            className="btnHover"
            onClick={() => {
              localStorage.removeItem("token");
              document.location.reload();
              navigate("/signup");
            }}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
