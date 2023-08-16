import React from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddIcon from "@mui/icons-material/Add";
const Header = ({ token, setAdminId }) => {
  const navigate = useNavigate();

  return (
    <div className="headerMainContainer container">
      <div className="">
        <h2 onClick={() => navigate("/home")} className="headerHeadingDiv">
          REAL HOME ESTATE
        </h2>
      </div>
      <div className="navLinksDiv">
        <NavLink className="navlinks" to="/buy">
          Buy
        </NavLink>
        <NavLink className="navlinks" to="/rent">
          Rent
        </NavLink>
        <NavLink className="navlinks" to="/sell">
          Sell
        </NavLink>
        <NavLink className="navlinks" to="/agencies">
          Agencies
        </NavLink>
        <NavLink className="navlinks" to="/blog">
          Blog
        </NavLink>
        <NavLink className="navlinks" to="/about">
          About us
        </NavLink>
      </div>
      {token === null ? (
        <div className="navLinksDiv">
          <button
            title="Login or Register"
            className="btnHover"
            onClick={() => navigate("/signup")}
          >
            Regester/Login
          </button>
        </div>
      ) : (
        <div className="navLinksDiv">
          <IconButton
            onClick={() => navigate("/favorite")}
            sx={{ margin: "0 2rem 0 0 " }}
            title="Favorite Properties"
          >
            <FavoriteIcon sx={{ color: "red" }} />
          </IconButton>
          <button
            title="Logout"
            className="btnHover"
            onClick={() => {
              localStorage.removeItem("user_Id");
              localStorage.removeItem("token");
              document.location.reload();
              setAdminId(null);
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
