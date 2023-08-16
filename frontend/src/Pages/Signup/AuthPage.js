import React, { useState } from "react";
import "./SignUp.css";
import { NavLink, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../BaseRealEstate";
import SignUp from "./SignUp";
const AuthPage = () => {
  return (
    <div className="signUpMainContainer">
      <div className="backgroundFilterSignUp my-gradient"></div>
      <div className="formContainerMain">
        <div className="formCont">
          <div className="buttonAuthDiv">
            <NavLink className="buttonAuth" to="/login">
              <div className="mainbtnDiv h-100 w-100">Login</div>
            </NavLink>
            <NavLink className="buttonAuth" to="/signup">
              <div className="mainbtnDiv h-100 w-100">Register</div>
            </NavLink>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
