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
import { BASE_URL, convertTOBase64 } from "../../BaseRealEstate";
import CardComponent from "../../Components/CardComponent";
import { motion } from "framer-motion";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import HomePageData from "./HomePageData";
const HomePage = ({
  token,
  adminId,
  setMinPrice,
  setMaxPrice,
  minPrice,
  maxPrice,
  setDropdownSearch,
  dropdownSearch,
  refreshSearchData,
  setRefreshSearchData,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchDropdownBool, setSearchDropdownBool] = useState(false);
  const shouldShowmyproperty = location.pathname === "/myproperty";
  const shouldShowAbout = location.pathname === "/about";
  const shouldShowproperties = location.pathname === "/properties";
  const shouldShowbuy = location.pathname === "/buy";
  const [reloadData, setReloadData] = useState(false);
  const shouldShowhome = location.pathname === "/home";
  const shouldShowSearch = location.pathname === "/search/";
  const shouldShowrent = location.pathname === "/rent";
  const [citySearch, setCitySearch] = useState("");
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
    cityId: "",
  });
  const [citiesData, setCitiesData] = useState([]);
  const [propertyData, setPropertyData] = useState([]);
  const [selectedButton, setSelectedButton] = useState("Buy");
  const [image, setimage] = useState("");
  const [citySearchData, setCitySearchData] = useState([]);
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
            "Content-Type": "application/json", // Set the correct Content-Type
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
  const handlePostFeature = async (property_id) => {
    await axios
      .put(
        BASE_URL + "/properties/feature/" + property_id,
        { _id: property_id, is_featured: true },
        {
          headers: {
            "Content-Type": "application/json", // Set the correct Content-Type
          },
        }
      )
      .then((val) => {
        if (val.status === 200) {
          setReloadData(!reloadData);
          window.alert("Success");
        }
      })
      .catch((e) => {
        console.log(e);
        window.alert("Failed");
      });
  };
  const handleRemoveFeature = async (property_id) => {
    await axios
      .put(
        BASE_URL + "/properties/feature/" + property_id,
        { _id: property_id, is_featured: false },
        {
          headers: {
            "Content-Type": "application/json", // Set the correct Content-Type
          },
        }
      )
      .then((val) => {
        if (val.status === 200) {
          setReloadData(!reloadData);
          window.alert("Success");
        }
      })
      .catch((e) => {
        console.log(e);
        window.alert("Failed");
      });
  };
  const handleButtonClick = (buttonType) => {
    setSelectedButton(buttonType);
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
    await axios
      .get(BASE_URL + "/cities/")
      .then((val) => {
        setCitiesData(val.data);
      })
      .catch((e) => console.log(e));
  };
  const getFavDataAPI = async () => {
    await axios
      .get(BASE_URL + "/favorites/")
      .then((val) => {
        setFavApiData(val.data);
      })
      .catch((e) => console.log(e));
  };
  const handleChangeDropdown = (e) => {
    const { name, value } = e.target.value;
    setDropdownSearch(value);
  };

  useEffect(() => {
    getDataProperty();
  }, [propertyModal]);
  useEffect(() => {
    getFavDataAPI();
  }, []);
  useEffect(() => {
    if (shouldShowbuy) {
      setSelectedButton("Buy");
    } else if (shouldShowrent) {
      setSelectedButton("Rent");
    } else {
      setSelectedButton("Buy");
    }
  }, [shouldShowbuy, shouldShowrent, shouldShowhome, shouldShowproperties]);

  return (
    <div className="homePageMainContainer">
      <div className="backgroundFilter"></div>
      <div className="contentContainer ">
        <h1 className="h1TagPicCard">
          We will help you find your{" "}
          <span className="text-success">Wonderful</span> home
        </h1>
        <p className="pTagPicCard">
          A great platform to buy, sell and rent your properties without any
          agent or commissions.
        </p>
      </div>
      {!shouldShowproperties && !shouldShowAbout && (
        <div className="mainTotalSearchbar ">
          <div className="typeSearchBar">
            {shouldShowbuy && (
              <button
                className={
                  selectedButton === "Buy"
                    ? "selectedButton"
                    : "unselectedButton"
                }
                onClick={() => handleButtonClick("Buy")}
              >
                Buy
              </button>
            )}
            {shouldShowrent && (
              <button
                className={
                  selectedButton === "Rent"
                    ? "selectedButton"
                    : "unselectedButton"
                }
                onClick={() => handleButtonClick("Rent")}
              >
                Rent
              </button>
            )}
            {(shouldShowhome ||
              shouldShowproperties ||
              shouldShowmyproperty) && (
              <>
                <button
                  className={
                    selectedButton === "Buy"
                      ? "selectedButton"
                      : "unselectedButton"
                  }
                  onClick={() => handleButtonClick("Buy")}
                >
                  Buy
                </button>
                <button
                  className={
                    selectedButton === "Rent"
                      ? "selectedButton"
                      : "unselectedButton"
                  }
                  onClick={() => handleButtonClick("Rent")}
                >
                  Rent
                </button>
              </>
            )}
          </div>
          <div className="searchBarContainer">
            <div className="seacrhBarContent">
              <div className="d-flex flex-column">
                <strong>Select City:</strong>
                <select
                  name="houses"
                  id="houses"
                  className="selectTagMain"
                  value={citySearch}
                  onChange={(e) => setCitySearch(e.target.value)}
                >
                  <option value="Select an option">Select an option</option>
                  {citiesData.map((val, i) => (
                    <option value={val._id}>{val.name}</option>
                  ))}
                </select>
              </div>
              <div className="d-flex flex-column">
                <strong>Select Property:</strong>
                <input
                  placeholder="Enter name"
                  name="dropdownSearch"
                  id="dropdownSearch"
                  className="selectTagMain"
                  value={dropdownSearch}
                  onChange={(e) => {
                    setDropdownSearch(e.target.value);
                  }}
                />
              </div>
              <div className="d-flex flex-column">
                <strong>Min Price:</strong>
                <input
                  type="number"
                  placeholder="Enter max price"
                  name="minPrice"
                  id="minPrice"
                  className="selectTagMain"
                  value={minPrice}
                  onChange={(e) => {
                    setMinPrice(e.target.value);
                  }}
                />
              </div>
              <div className="d-flex flex-column">
                <strong>Max Price:</strong>
                <input
                  type="number"
                  placeholder="Enter max price"
                  name="maxPrice"
                  id="maxPrice"
                  className="selectTagMain"
                  value={maxPrice}
                  onChange={(e) => {
                    setMaxPrice(e.target.value);
                  }}
                />
              </div>
            </div>
            <button
              onClick={() => {
                if (citySearch.length > 0) {
                  navigate("/search/" + citySearch);
                  setRefreshSearchData(!refreshSearchData);
                } else {
                  window.alert("Please select city!");
                }
              }}
              className="btnHover btnSearchMain"
            >
              Search
            </button>
          </div>
        </div>
      )}

      {searchDropdownBool === true ? (
        <div className="my-4">
          <div className="container propertyCardsMain  row wd100vw">
            {propertyData
              .filter(
                (val) =>
                  (propertyData.length !== 0 &&
                    dropdownSearch.length > 0 &&
                    val.title
                      .toLowerCase()
                      .includes(dropdownSearch.toLowerCase())) ||
                  (propertyData.length !== 0 &&
                    minPrice.length > 0 &&
                    maxPrice.length > 0 &&
                    val.price >= minPrice &&
                    val.price <= maxPrice)
              )
              .map((val, i) => {
                const favProperty = favApiData.find(
                  (item) => item.property_id === val._id
                );
                return (
                  <motion.div
                    onClick={() => {
                      if (user_id !== null) {
                        navigate("/properties/" + val._id);
                      }
                    }}
                    key={val._id}
                    whileTap={{ scale: 1.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="propertyCard col-md-4 curserPointer"
                  >
                    <CardComponent
                      is_featured={val.is_featured}
                      adminId={adminId}
                      handlePostFeature={handlePostFeature}
                      handleRemoveFeature={handleRemoveFeature}
                      file={val.image[0]}
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
                      fav_id={
                        favProperty !== undefined && favProperty.property_id
                      }
                      description={null}
                      handleMessage={() => {
                        navigate("/messages/" + val.user_id);
                      }}
                    />
                  </motion.div>
                );
              })}
          </div>
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default HomePage;
