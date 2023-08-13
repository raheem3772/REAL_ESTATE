import React, { useEffect, useState } from "react";
import "./Content.css";
import CardComp from "../CardComp";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { BASE_URL } from "../../BaseApiUrl";
import { motion } from "framer-motion";
const Content = ({ token }) => {
  const user_id = localStorage.getItem("user_Id");
  const [inputData, setInputData] = useState({
    title: "",
    location: "",
    price: "",
    size: "",
    bedrooms: "",
    buyOrRent: "",
  });
  const [propertyModal, setPropertyModal] = useState(false);
  const [propertyData, setPropertyData] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };
  const handlePostProperty = async () => {
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
  const getDataProperty = async () => {
    await axios
      .get(BASE_URL + "/properties/")
      .then((val) => {
        console.log(val);
        setPropertyData(val.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    getDataProperty();
  }, [propertyModal]);
  return (
    <div>
      <div className="contentMain">
        <input
          type="search"
          className="col-md-4 searchInput"
          placeholder="Search..."
        />
      </div>
      <div className="row">
        <div className=" contentdiv">
          <div className=" col-md-6 shapeDiv  ">
            <motion.h2
              animate={{ x: [50, 50, 50], opacity: 1, scale: 1 }}
              transition={{
                duration: 2,
                delay: 0.5,
                ease: [0.5, 0.71, 1, 1.5],
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              whileHover={{ scale: 1.2 }}
              className=" h1Tag"
            >
              Real Estate
            </motion.h2>
            <motion.div
              animate={{ x: [50, 50, 50], opacity: 1, scale: 1 }}
              transition={{
                duration: 2,
                delay: 0.5,
                ease: [0.5, 0.71, 1, 1.5],
              }}
              className="pDiv"
            >
              <p className="  text-justify">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s. Lorem Ipsum is simply dummy text of
                the printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s.
              </p>
              <motion.button
                whileTap={{ scale: 1.3 }}
                whileHover={{ scale: 1.1 }}
                className="btnHover"
              >
                Learn more
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
      <div className="my-4 propertyDiv ">
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
        <div className=" d-flex justify-content-center">
          {token !== null ? (
            <button
              className="btnHover1"
              onClick={() => {
                setPropertyModal(true);
              }}
            >
              Add Property
            </button>
          ) : null}
        </div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {
              scale: 0.8,
              opacity: 0,
            },
            visible: {
              scale: 1,
              opacity: 1,
              transition: {
                delay: 0.4,
              },
            },
          }}
          className=" row my-4 "
        >
          {propertyData.map((val) => (
            <div className="col-md-3 my-4 ">
              <CardComp
                title={val.title}
                price={val.price + " $"}
                location={val.location}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Content;
