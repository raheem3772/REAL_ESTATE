import React, { useEffect, useState } from "react";
import "./HomePage.css";
import Header from "../../Components/Header/Header";
import Content from "../../Components/Content/Content";
import Vedio from "../../assets/DashVedio.mp4";
import CardComp from "../../Components/CardComp";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
import { Button } from "@mui/material";

const HomePage = () => {
  const [token, setToken] = useState();

  useEffect(() => {
    const getToken = localStorage.getItem("token");
    setToken(getToken);
  }, []);
  const navigate = useNavigate();
  return (
    <div>
      <div className="mainContHome">
        <video className="background-video" autoPlay loop muted>
          <source src={Vedio} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <Header token={token} />
        {/* <Routes> */}
        {/* {token === null ? (
          <Routes>
            <Route path="/*" element={<Navigate to="/signup" />} />
          </Routes>
        ) : ( */}
        <Routes>
          <Route path="/*" element={<Navigate to="/home" />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="home" element={<Content token={token} />} />
          <Route path="agency" element={<Content />} />
          <Route path="blogs" element={<Content />} />
          <Route path="about" element={<Content />} />
        </Routes>
        {/* )} */}
        {/* </Routes> */}
      </div>
    </div>
  );
};

export default HomePage;
