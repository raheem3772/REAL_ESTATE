import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../BaseApiUrl";
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handlePost = async () => {
    const { email, password } = formData;
    await axios
      .post(
        BASE_URL + "/users/login",
        {
          email,
          password,
        },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((val) => {
        if (val.status === 200) {
          window.alert(val["data"]["message"]);
          setFormData({
            email: "",
            password: "",
          });
          console.log(val);
          const token = val["data"]["token"];
          localStorage.setItem("token", token);
          navigate("/home");
          document.location.reload();
        }
      })
      .catch((e) => {
        console.log(e);
        window.alert(e.response["data"]["message"]);
      });
  };

  return (
    <div className="mainContSignUp ">
      <div className="row">
        <div className=" col-md-6 "></div>
        <div className="formCont  col-md-6">
          <div className="paperForm">
            <h1 className=" text-center">Login</h1>
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
            <div className="btnMargin d-flex justify-content-center">
              <button className="btnHover" type="button" onClick={handlePost}>
                Login
              </button>
            </div>
            <div className="my-2 d-flex justify-content-center">
              <Button
                className="text-white"
                onClick={() => navigate("/signup")}
              >
                Don't have an accunt!
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
