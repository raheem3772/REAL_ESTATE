import React, { useState } from "react";
import "./SignUp.css";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../BaseApiUrl";
const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handlePost = async () => {
    const { username, email, password, confirmpassword } = formData;
    await axios
      .post(
        BASE_URL + "/users/signup/",
        {
          username,
          email,
          password,
          confirmpassword,
        },
        {
          Headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((val) => {
        if (val.status) {
          window.alert("User register successfully");
          console.log(val);
          setFormData({
            username: "",
            email: "",
            password: "",
            confirmpassword: "",
          });
          navigate("/signin");
        } else {
          window.alert(val.message);
        }
      })
      .catch((e) => {
        window.alert(e.response["data"]["message"]);
      });
  };

  return (
    <div className="mainContSignUp ">
      <div className="row">
        <div className=" col-md-6 "></div>
        <div className="formCont  col-md-6">
          <div className="paperForm">
            <h1 className=" text-center">SignUp</h1>
            <div className="my-2">
              <strong>Username</strong>
              <input
                type="text"
                className="form-control"
                name="username"
                placeholder="Type here"
                value={formData.username}
                onChange={handleInput}
              />
            </div>
            <div className="my-2">
              <strong>Email</strong>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Type here"
                value={formData.email}
                onChange={handleInput}
              />
            </div>
            <div className="my-2">
              <strong>Password</strong>
              <input
                type="password"
                className="form-control"
                name="password"
                value={formData.password}
                onChange={handleInput}
              />
            </div>
            <div className="my-2">
              <strong>Confirm Password</strong>
              <input
                type="password"
                className="form-control"
                name="confirmpassword"
                value={formData.confirmpassword}
                onChange={handleInput}
              />
            </div>
            <div className="btnMargin d-flex justify-content-center">
              <button className="btnHover" type="button" onClick={handlePost}>
                SignUp
              </button>
            </div>
            <div className="my-2 d-flex justify-content-center">
              <Button
                className="text-white"
                onClick={() => navigate("/signin")}
              >
                Already have an account!
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
