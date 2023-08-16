import React, { useEffect, useState } from "react";
import "./HomePage.css";
import { Button, IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import LocationCityIcon from "@mui/icons-material/LocationCity";

import FavoriteIcon from "@mui/icons-material/Favorite";
import { Modal } from "react-bootstrap";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { BASE_URL } from "../../BaseRealEstate";
import CardComponent from "../../Components/CardComponent";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
const HomePage = ({ token }) => {
  const navigate = useNavigate();
  const [favApiData, setFavApiData] = useState([]);
  const [propertyModal, setPropertyModal] = useState(false);
  const [userData, setUserData] = useState([]);
  const user_id = localStorage.getItem("user_Id");
  const [inputData, setInputData] = useState({
    title: "",
    location: "",
    price: "",
    size: "",
    bedrooms: "",
    buyOrRent: "",
  });
  const [propertyData, setPropertyData] = useState([]);
  const [selectedButton, setSelectedButton] = useState("Buy");

  const handleButtonClick = (buttonType) => {
    setSelectedButton(buttonType);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };
  const handlePostProperty = async () => {
    console.log(user_id);
    const { title, location, price, size, bedrooms, buyOrRent } = inputData;
    await axios
      .post(
        BASE_URL + "/properties",
        {
          title: title,
          location: location,
          price: price,
          size: size,
          bedrooms: bedrooms,
          buyOrRent: buyOrRent,
          user_id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((val) => {
        console.log(val);
        setPropertyModal(false);
        setInputData({
          title: "",
          location: "",
          price: "",
          size: "",
          bedrooms: "",
          buyOrRent: "",
        });
      })
      .catch((e) => console.warn(e));
  };
  const handlePostFav = async (property_id) => {
    const user_id = localStorage.getItem("user_Id");
    await axios
      .post(
        BASE_URL + "/favorites/",
        {
          user_id,
          property_id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((val) => {
        console.log(val);
        console.log("Done");
      })
      .catch((e) => {
        console.log(e);
        console.log("Failed");
      });
  };
  const getDataProperty = async () => {
    await axios
      .get(BASE_URL + "/properties/")
      .then((val) => {
        setPropertyData(val.data);
      })
      .catch((e) => {
        console.log(e);
      });
    await axios
      .get(BASE_URL + "/users/")
      .then((val) => {
        setUserData(val.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getFavDataAPI = async () => {
    await axios
      .get(BASE_URL + "/favorites/")
      .then((val) => {
        setFavApiData(val.data);
      })
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    getDataProperty();
  }, [propertyModal]);
  useEffect(() => {
    getFavDataAPI();
  }, []);
  return (
    <div className="homePageMainContainer">
      <div className="backgroundFilter"></div>
      <div className="contentContainer ">
        <h1 className="h1TagPicCard">
          We will help you find your
          <span className="text-success">Wonderful</span> home
        </h1>
        <p className="pTagPicCard">
          A great platform to buy, sell and rent your properties without any
          agent or commissions.
        </p>
      </div>
      <div className="mainTotalSearchbar ">
        <div className="typeSearchBar">
          <button
            className={
              selectedButton === "Buy" ? "selectedButton" : "unselectedButton"
            }
            onClick={() => handleButtonClick("Buy")}
          >
            Buy
          </button>
          <button
            className={
              selectedButton === "Rent" ? "selectedButton" : "unselectedButton"
            }
            onClick={() => handleButtonClick("Rent")}
          >
            Rent
          </button>
        </div>
        <div className="searchBarContainer">
          <div className="seacrhBarContent">
            <div>
              <strong>Search:</strong>
              <input
                type="search"
                name="search"
                id="search"
                placeholder="Search..."
                className="searchBarMain"
              />
            </div>
            <div>
              <strong>Select Categories:</strong>
              <select name="houses" id="houses" className="selectTagMain">
                <option value="Option 1">Option 1</option>
              </select>
            </div>
            <div>
              <strong>Min Price:</strong>
              <select name="houses" id="houses" className="selectTagMain">
                <option value="Option 1">Option 1</option>
              </select>
            </div>
            <div>
              <strong>Max Price:</strong>
              <select name="houses" id="houses" className="selectTagMain">
                <option value="Option 1">Option 1</option>
              </select>
            </div>
          </div>
          <button className="btnHover btnSearchMain">Search</button>
        </div>
      </div>
      <div className="my-4 bg-blue-500">
        <h1 className="text-center iconsHelpCard">How i can Help you!</h1>
        <div className="help3Cards">
          <div className="helpCard">
            <HomeIcon className="iconsHelpCard" sx={{ fontSize: "5rem" }} />
            <h3>Buy a Home</h3>
            <p>
              With over 1 million+ homes for sale available on the website, Our
              website can match you with a house you will want ti call home.
            </p>
            <button className="btnHover my-2">Find a Home</button>
          </div>
          <div className="helpCard">
            <SupportAgentIcon
              className="iconsHelpCard"
              sx={{ fontSize: "5rem" }}
            />
            <h3 className="">Rent a Home</h3>
            <p>
              With 35+ filters can custom keyword search, Our website can help
              you easily find a home or apartment for rent that you'll love.
            </p>
            <button className="btnHover my-2">Find a Home</button>
          </div>
          <div className="helpCard">
            <LocationCityIcon
              className="iconsHelpCard"
              sx={{ fontSize: "5rem" }}
            />
            <h3 className="">See Agencies</h3>
            <p>
              With over 1 million+ homes for sale available on the website, Our
              website can match you with a house you will want ti call home.
            </p>
            <button className="btnHover my-2">Find a Home</button>
          </div>
        </div>
      </div>
      <div className="propertyDiv">
        <h2>Properties</h2>
        {token !== null && (
          <button
            className="btnHover mt-3"
            onClick={() => setPropertyModal(true)}
          >
            <AddIcon /> Add Property
          </button>
        )}
      </div>
      <div className="container propertyCardsMain row">
        {propertyData.map((val, i) => {
          const favProperty = favApiData.find(
            (item) => item.property_id === val._id
          );
          return (
            <motion.div
              whileTap={{ scale: 1.1 }}
              whileHover={{ scale: 1.05 }}
              className="propertyCard col-md-4 curserPointer"
            >
              <CardComponent
                uid={val.user_id}
                currentUser={user_id}
                title={val.title}
                price={val.price}
                bedrooms={val.bedrooms}
                size={val.size}
                location={val.location}
                rating={null}
                handlePostFav={handlePostFav}
                property_id={val._id}
                fav_id={favProperty !== undefined && favProperty.property_id}
                description={null}
                handleMessage={() => {
                  navigate("/messages/" + val._id);
                }}
              />
            </motion.div>
          );
        })}
      </div>
      <Modal
        show={propertyModal}
        onHide={() => {
          setPropertyModal(false);
          setInputData({
            title: "",
            location: "",
            price: "",
            size: "",
            bedrooms: "",
            buyOrRent: "",
          });
        }}
      >
        <Modal.Header className="bg-light" closeButton>
          <Modal.Title>Add Property</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="my-2">
            <strong>Title</strong>
            <input
              type="text"
              className="form-control"
              name="title"
              placeholder="Type here"
              value={inputData.title}
              onChange={handleChange}
            />
          </div>
          <div className="my-2">
            <strong>Location</strong>
            <input
              type="text"
              className="form-control"
              name="location"
              placeholder="Type here"
              value={inputData.location}
              onChange={handleChange}
            />
          </div>
          <div className="my-2">
            <strong>Price</strong>
            <input
              type="number"
              className="form-control"
              name="price"
              placeholder="$"
              value={inputData.price}
              onChange={handleChange}
            />
          </div>
          <div className="my-2">
            <strong>Size</strong>
            <input
              type="number"
              className="form-control"
              name="size"
              placeholder="Type here"
              value={inputData.size}
              onChange={handleChange}
            />
          </div>
          <div className="my-2">
            <strong>Bedrooms</strong>
            <input
              type="text"
              className="form-control"
              name="bedrooms"
              placeholder="Type here"
              value={inputData.bedrooms}
              onChange={handleChange}
            />
          </div>
          <div className="my-2">
            <strong>Type</strong>
            <select
              type="text"
              className="form-select"
              name="buyOrRent"
              value={inputData.buyOrRent}
              onChange={handleChange}
            >
              <option>Select a option</option>
              <option value="buy">Sell</option>
              <option value="rent">Rent</option>
            </select>
          </div>
        </Modal.Body>
        <Modal.Footer className="bg-light">
          <button
            className="btnHover bg-dark "
            onClick={() => {
              setPropertyModal(false);
              setInputData({
                title: "",
                location: "",
                price: "",
                size: "",
                bedrooms: "",
                buyOrRent: "",
              });
            }}
          >
            Cancel
          </button>
          <button className="btnHover" onClick={handlePostProperty}>
            Save
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default HomePage;
