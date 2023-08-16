import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../../BaseRealEstate";
import { useNavigate } from "react-router-dom";

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
          localStorage.setItem("user_Id", val["data"]["user_Id"]);
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
    <div className="textFieldsDiv">
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
      <div className="btnMargin d-flex justify-content-center my-4">
        <button className="btnHover" type="button" onClick={handlePost}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
