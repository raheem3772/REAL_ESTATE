import React from "react";
import "./Header.css";
import { Button } from "@mui/material";
import { motion } from "framer-motion";
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
          <motion.button
            whileTap={{ scale: 1.3 }}
            whileHover={{ scale: 1.1 }}
            className="btnHover"
            onClick={() => navigate("/signup")}
          >
            Register/Login
          </motion.button>
        ) : (
          <motion.button
            whileTap={{ scale: 1.3 }}
            whileHover={{ scale: 1.1 }}
            className="btnHover"
            onClick={() => {
              localStorage.removeItem("token");
              document.location.reload();
              navigate("/signup");
            }}
          >
            Logout
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default Header;
