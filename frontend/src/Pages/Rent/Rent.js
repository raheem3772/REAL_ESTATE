import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../BaseRealEstate";
import axios from "axios";
import { motion } from "framer-motion";
import CardComponent from "../../Components/CardComponent";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";

const Rent = () => {
  const navigate = useNavigate();
  const user_id = localStorage.getItem("user_Id");
  const [favApiData, setFavApiData] = useState([]);
  const [rentProperty, setRentProperty] = useState([]);
  const [showModalSingleProperty, setShowModalSingleProperty] = useState(false);
  const [propertySingleData, setpropertySingleData] = useState({});
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
  const getRentProperty = async () => {
    await axios
      .get(BASE_URL + "/properties/")
      .then((val) => setRentProperty(val.data))
      .catch((e) => console.log(e));
  };
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
    getRentProperty();
  }, []);
  return (
    <div>
      <div className="container propertyCardsMain wd100vw  row">
        {rentProperty
          .filter((val) => val.buyOrRent === "rent")
          .map((val, i) => {
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
                  fav_id={favProperty !== undefined && favProperty.property_id}
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
      </div>
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

export default Rent;
