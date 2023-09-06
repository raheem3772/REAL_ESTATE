import React, { useEffect, useState } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
  MDBIcon,
} from "mdb-react-ui-kit";
import axios from "axios";
import { BASE_URL } from "../../BaseRealEstate";
import "./Profile.css";
export default function Profile() {
  const user_Id = localStorage.getItem("user_Id");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [profileData, setProfileData] = useState({});
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
  const getProfileData = async () => {
    await axios
      .get(BASE_URL + "/agencyMain/" + user_Id)
      .then((val) => {
        setInputData({
          username: val.data["username"],
          email: val.data["email"],
          password: val.data["password"],
          contactInfo: val.data["contactInfo"],
          description: val.data["description"],
        });
        setImagePreview(BASE_URL + "/" + val.data["image"]);
        setImage(val.data["image"]);

        setProfileData(val.data);
      })
      .catch((e) => console.log(e));
  };

  const handleUpdate = async () => {
    const { username, email, password, contactInfo, description } = inputData;
    const formData = new FormData();
    formData.append("_id", user_Id);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("contactInfo", contactInfo);
    formData.append("description", description);
    formData.append("image", image);
    await axios
      .put(BASE_URL + "/agencymain/signup/" + user_Id, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((val) => {
        setInputData({
          username: val.data["username"],
          email: val.data["email"],
          password: val.data["password"],
          contactInfo: val.data["contactInfo"],
          description: val.data["description"],
        });
        setImage(val.data["image"]);
        window.alert("Successfully updated!");
        setProfileData(val.data);
      })
      .catch((e) => {
        window.alert("Something went wrong!");
        console.log(e);
      });
  };

  useEffect(() => {
    getProfileData();
  }, []);
  return (
    <div className="mainDivProfile">
      <div className="profileContents">
        <div>
          <div className="d-flex justify-content-center align-items-center mb-4">
            <div className="avatarProfile">
              <img className="imgProfile" src={imagePreview} alt="" />
            </div>
          </div>
          <div className="rowDivProfile">
            <div className="inputProfileDiv">
              <strong>Agency Name</strong>
              <input
                type="text"
                className="inputProfile"
                name="username"
                id="username"
                value={inputData.username}
                onChange={handleInput}
                placeholder="Type here"
              />
            </div>
            <div className="inputProfileDiv">
              <strong>Contact Info</strong>
              <input
                type="number"
                className="inputProfile"
                name="contactInfo"
                id="contactInfo"
                value={inputData.contactInfo}
                placeholder="Type here"
                onChange={handleInput}
              />
            </div>
          </div>
          <div className="rowDivProfile">
            <div className="inputProfileDiv">
              <strong>Email</strong>
              <input
                type="email"
                className="inputProfile"
                name="email"
                id="email"
                value={inputData.email}
                placeholder="Type here"
                onChange={handleInput}
              />
            </div>
            <div className="inputProfileDiv">
              <strong>Password</strong>
              <input
                type="password"
                className="inputProfile"
                name="password"
                id="password"
                value={inputData.password}
                placeholder="********"
                onChange={handleInput}
              />
            </div>
          </div>
          <div className="rowDivProfile">
            <div className="inputProfileDiv">
              <strong>Attachment</strong>
              <input
                type="file"
                className="inputProfile"
                name="image"
                id="image"
                onChange={(e) => {
                  setImage(e.target.files[0]);

                  setImagePreview(URL.createObjectURL(e.target.files[0]));
                }}
              />
            </div>
          </div>
          <div className="inputProfileDiv">
            <strong>Description</strong>
            <textarea
              className="inputProfile"
              name="description"
              id="description"
              value={inputData.description}
              placeholder="Type here"
              onChange={handleInput}
            ></textarea>
          </div>
          <div
            className="d-flex justify-content-center"
            style={{ marginTop: "2rem" }}
          >
            <button className="btnHover" onClick={handleUpdate}>
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
