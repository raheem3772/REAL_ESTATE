import React, { useEffect, useRef, useState } from "react";
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
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const HomePageData = ({ token, adminId }) => {
  const navigate = useNavigate();
  const [reloadData, setReloadData] = useState(false);
  const [favApiData, setFavApiData] = useState([]);
  const [showModalSingleProperty, setShowModalSingleProperty] = useState(false);
  const [propertySingleData, setpropertySingleData] = useState({});
  const user_id = localStorage.getItem("user_Id");
  const [propertyData, setpropertyData] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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

  useEffect(() => {
    getPropertyData();
  }, [reloadData]);
  const handleMessage = async (id) => {
    await axios
      .get(BASE_URL + "/properties/" + id)
      .then((val) => {
        setShowModalSingleProperty(true);
        setpropertySingleData(val.data);
      })
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    // Function to update windowWidth state when the window resizes
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Attach the event listener when the component mounts
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array to run the effect only once

  useEffect(() => {
    console.log(`Window width changed to: ${windowWidth}`);
  }, [windowWidth]);
  return (
    <div>
      <div className="my-4 bg-blue-500">
        <h1 className="text-center iconsHelpCard">How can I Help you?</h1>
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
      {propertyData.filter((val) => val.is_featured === true).length !== 0 && (
        <div className="my-4">
          <h2 className="mb-4 text-center">Feature Property</h2>

          <Slider
            infinite={true}
            slidesToShow={windowWidth > 767 ? 3 : 1}
            slidesToScroll={1}
            autoplay={true}
            autoplaySpeed={3000} // Adjust the autoplay speed as needed
            arrows={false}
            className="container propertyCardsMain row propertySliderMain justify-content-start"
          >
            {propertyData
              .filter((val) => val.is_featured === true)
              .map((val, i) => {
                const favProperty = favApiData.find(
                  (item) => item.property_id === val._id
                );
                return (
                  <motion.div
                    key={val._id}
                    whileTap={{ scale: 1.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="propertyCard bg-white col-md-4 curserPointer "
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
                        favProperty !== undefined && favProperty.property_id
                      }
                      description={null}
                      handleMessage={() => handleMessage(val._id)}
                      handleReadMore={() => {
                        if (user_id !== null) {
                          navigate("/properties/" + val._id);
                        }
                      }}
                    />
                  </motion.div>
                );
              })}
          </Slider>
        </div>
      )}
      {propertyData.filter((val) => val.buyOrRent === "buy").length !== 0 && (
        <div className="my-4">
          <h2 className="mb-4 text-center">Properties for Buy</h2>
          <Slider
            infinite={true}
            slidesToShow={
              (propertyData.filter((val) => val.buyOrRent === "buy").length ===
                1 &&
                1) ||
              (propertyData.filter((val) => val.buyOrRent === "buy").length ===
                2 &&
                2) ||
              (propertyData.filter((val) => val.buyOrRent === "buy").length >
                2 &&
                3)
            } // Change this to the number of visible slides at a time
            slidesToScroll={1}
            autoplay={true}
            autoplaySpeed={3000} // Adjust the autoplay speed as needed
            arrows={true}
            className="container propertyCardsMain row propertySliderMain justify-content-start"
          >
            {propertyData
              .filter((val) => val.buyOrRent === "buy")
              .slice(0, 10)
              .map((val, i) => {
                const favProperty = favApiData.find(
                  (item) => item.property_id === val._id
                );
                return (
                  <motion.div
                    key={val._id}
                    whileTap={{ scale: 1.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="propertyCard bg-white col-md-4 curserPointer"
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
                      handleMessage={() => handleMessage(val._id)}
                      handleReadMore={() => {
                        if (user_id !== null) {
                          navigate("/properties/" + val._id);
                        }
                      }}
                    />
                  </motion.div>
                );
              })}
          </Slider>
        </div>
      )}
      {propertyData.filter((val) => val.buyOrRent === "rent").length !== 0 && (
        <div className="my-4">
          <h2 className="mb-4 text-center">Properties for Rent</h2>
          <Slider
            infinite={true}
            slidesToShow={
              (propertyData.filter((val) => val.buyOrRent === "rent").length ===
                1 &&
                1) ||
              (propertyData.filter((val) => val.buyOrRent === "rent").length ===
                2 &&
                2) ||
              (propertyData.filter((val) => val.buyOrRent === "rent").length >
                2 &&
                3)
            }
            slidesToScroll={1}
            autoplay={true}
            autoplaySpeed={3000} // Adjust the autoplay speed as needed
            arrows={false}
            className="container propertyCardsMain row propertySliderMain justify-content-start"
          >
            {propertyData
              .filter((val) => val.buyOrRent === "rent")
              .slice(0, 10)
              .map((val, i) => {
                const favProperty = favApiData.find(
                  (item) => item.property_id === val._id
                );
                return (
                  <motion.div
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
                      handleMessage={() => handleMessage(val._id)}
                      handleReadMore={() => {
                        if (user_id !== null) {
                          navigate("/properties/" + val._id);
                        }
                      }}
                    />
                  </motion.div>
                );
              })}
          </Slider>
        </div>
      )}
      <Modal
        centered
        show={showModalSingleProperty}
        onHide={() => setShowModalSingleProperty(false)}
      >
        <Modal.Header closeButton>
          {/* <Modal.Title>Contact Info</Modal.Title> */}
        </Modal.Header>

        <Modal.Body>
          <h3 className="text-center my-lg-5">
            <span style={{ fontSize: "25px", color: "grey" }}>
              Contact Info:{" "}
            </span>
            {propertySingleData !== null && +propertySingleData.phone}
          </h3>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default HomePageData;
