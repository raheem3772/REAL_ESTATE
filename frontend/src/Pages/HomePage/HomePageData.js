import React, { useEffect, useState } from "react";
import "./HomePage.css";
import { Button, IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import Pic1 from "../../assets/Dash1.png";
import Pic2 from "../../assets/Dash2.png";
import Pic3 from "../../assets/Dash3.png";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Carousel, CarouselItem, Modal } from "react-bootstrap";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { BASE_URL, convertTOBase64 } from "../../BaseRealEstate";
import CardComponent from "../../Components/CardComponent";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
const HomePageData = ({ token, adminId }) => {
  const navigate = useNavigate();
  const [reloadData, setReloadData] = useState(false);
  const [favApiData, setFavApiData] = useState([]);
  const user_id = localStorage.getItem("user_Id");
  const [propertyData, setpropertyData] = useState([]);
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
            "Content-Type": "multipart/form-data", // Set the correct Content-Type
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
  const getFavDataAPI = async () => {
    await axios
      .get(BASE_URL + "/favorites/")
      .then((val) => {
        setFavApiData(val.data);
      })
      .catch((e) => console.log(e));
  };
  const getPropertyData = async () => {
    await axios
      .get(BASE_URL + "/properties/")
      .then((val) => setpropertyData(val.data))
      .catch((e) => console.log(e));
  };
  const itemsPerPage = 3;
  const [activeSlide, setActiveSlide] = useState(0);

  const totalSlides = Math.ceil(propertyData.length / itemsPerPage);
  const handleSelect = (selectedIndex) => {
    setActiveSlide(selectedIndex);
  };

  useEffect(() => {
    getPropertyData();
  }, [reloadData]);

  return (
    <div>
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
      {propertyData.filter((val) => val.buyOrRent === "buy").length !== 0 && (
        <div className="my-4">
          <h2>Properties for Buy</h2>
          <div className="container propertyCardsMain  row wd100vw">
            {propertyData
              .filter((val) => val.buyOrRent === "buy")
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
      )}
      {propertyData.filter((val) => val.buyOrRent === "rent").length !== 0 && (
        <div className="my-4">
          <h2>Properties for Rent</h2>
          <div className="container propertyCardsMain  row wd100vw">
            {propertyData
              .filter((val) => val.buyOrRent === "rent")
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
      )}
      {propertyData.filter((val) => val.is_featured === true).length !== 0 && (
        <div className="my-4">
          <h2 className="mb-4 text-center">Feature Property</h2>
          <Carousel
            interval={2000}
            className="bg-white"
            activeIndex={activeSlide}
            onSelect={handleSelect}
          >
            {Array.from({ length: totalSlides }).map((_, slideIndex) => {
              const startIndex = slideIndex * itemsPerPage;
              const endIndex = startIndex + itemsPerPage;
              const slidePropertyData = propertyData
                .filter((val) => val.is_featured === true)
                .slice(startIndex, endIndex);
              console.log(slidePropertyData);
              return (
                <CarouselItem key={slideIndex}>
                  <div className="container bg-white  row">
                    {slidePropertyData.map((val, i) => {
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
                          className="propertyCard bg-white col-md-4 curserPointer"
                        >
                          <CardComponent
                            key={val._id}
                            is_featured={val.is_featured}
                            adminId={adminId}
                            handlePostFeature={() => {}}
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
                              favProperty !== undefined &&
                              favProperty.property_id
                            }
                            description={null}
                            handleMessage={() => {
                              navigate("/messages/" + val._id);
                            }}
                          />
                        </motion.div>
                      );
                    })}
                  </div>
                </CarouselItem>
              );
            })}
          </Carousel>
        </div>
      )}
    </div>
  );
};

export default HomePageData;
