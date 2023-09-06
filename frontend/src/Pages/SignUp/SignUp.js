import React, { useState } from "react";
import "./SignUp.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../BaseRealEstate";
import { Button } from "@mui/material";
const SignUp = () => {
  const [boolRegisterAgency, setBoolRegisterAgency] = useState(false);
  const [image, setImage] = useState("");
  const [imageUser, setImageUser] = useState("");
  const [docs, setDocs] = useState("");
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
    contactInfo: "",
    description: "",
  });
  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };
  const handlePost = async () => {
    const { username, email, password, confirmpassword } = inputData;
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirmpassword", confirmpassword);
    formData.append("image", imageUser);
    await axios
      .post(BASE_URL + "/users/signup/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((val) => {
        if (val.status) {
          window.alert("User register successfully");
          console.log(val);
          setInputData({
            username: "",
            email: "",
            password: "",
            confirmpassword: "",
          });
          navigate("/login");
        } else {
          window.alert(val.message);
        }
      })
      .catch((e) => {
        window.alert(e.response["data"]["message"]);
      });
  };
  const handlePostAgency = async () => {
    const {
      username,
      email,
      password,
      confirmpassword,
      contactInfo,
      description,
    } = inputData;
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirmpassword", confirmpassword);
    formData.append("contactInfo", contactInfo);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("docs", docs);
    // for (let i = 0; i < docs.length; i++) {
    //   formData.append("files", docs);
    // }
    await axios
      .post(BASE_URL + "/agencymain/signup/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((val) => {
        if (val.status === 201) {
          setInputData({
            username: "",
            email: "",
            password: "",
            confirmpassword: "",
            contactInfo: "",
            description: "",
          });
          setImage("");
          setDocs("");
          window.alert("Agency created successfully!");
        }
      })
      .catch((e) => {
        console.log(e);
        window.alert("Something went wrong!");
      });
  };

  return (
    <div
      className="textFieldsDiv"
      // style={{ width: boolRegisterAgency === false ? "auto" : "50vw" }}
    >
      {boolRegisterAgency === false ? (
        <>
          <div className="my-2">
            <strong>Username</strong>
            <input
              type="text"
              className="form-control"
              name="username"
              placeholder="Type here"
              value={inputData.username}
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
              value={inputData.email}
              onChange={handleInput}
            />
          </div>
          <div className="my-2">
            <strong>Password</strong>
            <input
              type="password"
              className="form-control"
              name="password"
              value={inputData.password}
              onChange={handleInput}
              placeholder="Type password"
            />
          </div>
          <div className="my-2">
            <strong>Confirm Password</strong>
            <input
              type="password"
              className="form-control"
              name="confirmpassword"
              value={inputData.confirmpassword}
              placeholder="Type password"
              onChange={handleInput}
            />
          </div>
          <div className="my-2">
            <strong>Attachment (Image)</strong>
            <input
              type="file"
              className="form-control"
              name="image"
              accept=".jpeg, .png, .jpg"
              onChange={(e) => setImageUser(e.target.files[0])}
            />
          </div>
          <div className=" d-flex justify-content-center">
            <Button onClick={() => setBoolRegisterAgency(true)}>
              Register Agency
            </Button>
          </div>
          <div className="btnMargin d-flex justify-content-center">
            <button
              className="btnHover mt-2"
              type="button"
              onClick={handlePost}
            >
              SignUp
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="row">
            <div className="my-2 col-md-6">
              <strong>Agency Name</strong>
              <input
                type="text"
                className="form-control"
                name="username"
                placeholder="Type here"
                value={inputData.username}
                onChange={handleInput}
              />
            </div>
            <div className="my-2 col-md-6">
              <strong>Email</strong>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Type here"
                value={inputData.email}
                onChange={handleInput}
              />
            </div>
          </div>
          <div className="row">
            <div className="my-2 col-md-6 ">
              <strong>Password</strong>
              <input
                type="password"
                className="form-control"
                name="password"
                value={inputData.password}
                placeholder="Type password"
                onChange={handleInput}
              />
            </div>
            <div className="my-2 col-md-6 ">
              <strong>Confirm Password</strong>
              <input
                type="password"
                className="form-control"
                name="confirmpassword"
                value={inputData.confirmpassword}
                placeholder="Type password"
                onChange={handleInput}
              />
            </div>
          </div>
          <div className="row">
            <div className="my-2 col-md-6">
              <strong>Contact Info</strong>
              <input
                type="number"
                className="form-control"
                name="contactInfo"
                placeholder="(+XX) XXX XXXXXXX"
                value={inputData.contactInfo}
                onChange={handleInput}
              />
            </div>
            <div className="my-2 col-md-6">
              <strong>Documents (Legal Documents)</strong>
              <input
                type="file"
                className="form-control"
                name="docs"
                accept=".pdf"
                onChange={(e) => setDocs(e.target.files[0])}
              />
            </div>
          </div>
          <div className="row">
            <div className="my-2 col-md-6">
              <strong>Attachment (Image)</strong>
              <input
                type="file"
                className="form-control"
                name="image"
                accept=".jpeg, .png, .jpg"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
          </div>
          <div className="my-2">
            <strong>Description</strong>
            <textarea
              className="form-control"
              name="description"
              placeholder="Type description"
              value={inputData.description}
              onChange={handleInput}
            />
          </div>
          <div className=" d-flex justify-content-center">
            <Button onClick={() => setBoolRegisterAgency(false)}>
              Register User
            </Button>
          </div>
          <div className="btnMargin d-flex justify-content-center">
            <button
              className="btnHover mt-2"
              type="button"
              onClick={handlePostAgency}
            >
              Register
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SignUp;
