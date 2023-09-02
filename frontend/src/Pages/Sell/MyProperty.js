import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../BaseRealEstate";
import { motion } from "framer-motion";
import CardComponent from "../../Components/CardComponent";
import { Modal } from "react-bootstrap";
import HomeIcon from "@mui/icons-material/Home";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

const MyProperty = ({ token, adminId, agencyMainValidation }) => {
  const [updateState, setUpdateState] = useState(-1);
  const [reloadData, setReloadData] = useState(false);
  const [propertyModal, setPropertyModal] = useState(false);
  const [favApiData, setFavApiData] = useState([]);
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const user_id = localStorage.getItem("user_Id");
  const [propertyData, setPropertyData] = useState([]);
  const [image, setimage] = useState([]);
  const [citiesData, setCitiesData] = useState([]);
  const [inputData, setInputData] = useState({
    title: "",
    location: "",
    price: "",
    size: "",
    bedrooms: "",
    bathrooms: "",
    buyOrRent: "",
    cityId: "",
    propertyType: "",
    phone: "",
    description: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };
  const handlePostProperty = async () => {
    const {
      title,
      location,
      price,
      size,
      bedrooms,
      buyOrRent,
      cityId,
      propertyType,
      bathrooms,
      phone,
      description,
    } = inputData;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("location", location);
    formData.append("price", price);
    formData.append("size", size);
    formData.append("bedrooms", bedrooms);
    formData.append("bathrooms", bathrooms);
    formData.append("buyOrRent", buyOrRent);
    formData.append("propertyType", propertyType);
    formData.append("phone", phone);
    formData.append("description", description);
    formData.append("user_id", user_id);
    formData.append("cityId", cityId);
    for (let i = 0; i < image.length; i++) {
      formData.append("image", image[i]);
    }
    await axios
      .post(BASE_URL + "/properties", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
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
  const handleUpdateProperty = async () => {
    const {
      title,
      location,
      price,
      size,
      bedrooms,
      buyOrRent,
      cityId,
      propertyType,
      bathrooms,
      phone,
      description,
    } = inputData;
    const formData = new FormData();
    formData.append("_id", updateState);
    formData.append("title", title);
    formData.append("location", location);
    formData.append("price", price);
    formData.append("size", size);
    formData.append("bedrooms", bedrooms);
    formData.append("bathrooms", bathrooms);
    formData.append("buyOrRent", buyOrRent);
    formData.append("propertyType", propertyType);
    formData.append("phone", phone);
    formData.append("description", description);
    formData.append("user_id", user_id);
    formData.append("cityId", cityId);
    for (let i = 0; i < image.length; i++) {
      formData.append("image", image[i]);
    }
    await axios
      .put(BASE_URL + "/properties/" + updateState, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((val) => {
        setReloadData(!reloadData);
        setPropertyModal(false);
        setUpdateState(-1);
        window.alert("Successfully updated");
        console.log(val);
      })
      .catch((e) => console.log(e));
  };
  const handleDeleteProperty = async (id) => {
    await axios
      .delete(BASE_URL + "/properties/" + id, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((val) => {
        setReloadData(!reloadData);
        window.alert("Successfully deleted");
      })
      .catch((e) => window.alert("Something went wrong"));
  };
  useEffect(() => {
    getDataProperty();
  }, [propertyModal, reloadData]);
  useEffect(() => {
    getFavDataAPI();
  }, []);
  const handleEdit = (val) => {
    setUpdateState(val._id);
    setPropertyModal(true);
    setInputData({
      title: val.title,
      location: val.location,
      price: val.price,
      size: val.size,
      bedrooms: val.bedrooms,
      bathrooms: val.bathrooms,
      buyOrRent: val.buyOrRent,
      cityId: val.cityId,
      propertyType: val.propertyType,
      phone: val.phone,
      description: val.description,
    });
  };
  return (
    <div>
      <div className="propertyDiv d-flex justify-content-center align-items-center flex-column">
        <h2>My Properties</h2>
        {/* (adminId !== null && adminId.includes(user_id)) || */}
        {agencyMainValidation !== null &&
        agencyMainValidation.includes(user_id) ? (
          <button
            className="btnHover mt-3"
            onClick={() => setPropertyModal(true)}
          >
            <AddIcon /> Add Property
          </button>
        ) : null}
      </div>
      <div className="container propertyCardsMain my-4  row wd100vw">
        {propertyData
          .filter((val) => val.user_id === user_id)
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
                  handleReadMore={() => {
                    if (user_id !== null) {
                      navigate("/properties/" + val._id);
                    }
                  }}
                  handleDeleteProperty={() => handleDeleteProperty(val._id)}
                  handleEdit={() => handleEdit(val)}
                  editProperty={"abcd"}
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
        size="lg"
        show={propertyModal}
        onHide={() => {
          setPropertyModal(false);
          setUpdateState(-1);
          setInputData({
            title: "",
            location: "",
            price: "",
            size: "",
            bedrooms: "",
            bathrooms: "",
            buyOrRent: "",
            cityId: "",
            propertyType: "",
            phone: "",
            description: "",
          });
        }}
      >
        <Modal.Header className="bg-light" closeButton>
          <Modal.Title>
            {updateState === -1 ? "Add Property" : "Update Property"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="my-2 col-md-6">
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
            <div className="my-2 col-md-6">
              <strong>Property Type</strong>
              <select
                className="form-select"
                name="propertyType"
                value={inputData.propertyType}
                onChange={handleChange}
              >
                <option>Select an option</option>
                <option value="house">House</option>
                <option value="flat">Flat</option>
                <option value="room">Room</option>
                <option value="residencial plot">Residencial Plot</option>
                <option value="commercial plot">Commercial Plot</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="my-2 col-md-6">
              <strong>City</strong>
              <select
                name="cityId"
                id="cityId"
                value={inputData.cityId}
                onChange={handleChange}
                className="form-select"
              >
                <option value="Select an option">Select an option</option>
                {citiesData.map((val, i) => (
                  <option key={val._id} value={val._id}>
                    {val.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="my-2 col-md-6">
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
          </div>
          <div className="row">
            <div className="my-2 col-md-6">
              <strong>Phone</strong>
              <input
                type="number"
                className="form-control"
                name="phone"
                placeholder="(XXX) XXX XXXXXXX"
                value={inputData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="my-2 col-md-6">
              <strong>Size in Marla</strong>
              <input
                min="0"
                type="number"
                className="form-control"
                name="size"
                placeholder="0"
                value={inputData.size}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="my-2 col-md-6">
              <strong>Bedrooms</strong>
              <input
                type="Number"
                className="form-control"
                name="bedrooms"
                placeholder="0"
                value={inputData.bedrooms}
                onChange={handleChange}
              />
            </div>
            <div className="my-2 col-md-6">
              <strong>Bathrooms</strong>
              <input
                type="Number"
                className="form-control"
                name="bathrooms"
                placeholder="0"
                value={inputData.bathrooms}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="my-2 col-md-6">
              <strong>Purpose</strong>
              <select
                type="text"
                className="form-select"
                name="buyOrRent"
                value={inputData.buyOrRent}
                onChange={handleChange}
              >
                <option>Select a option</option>
                <option value="buy">buy</option>
                <option value="rent">Rent</option>
              </select>
            </div>
            <div className="my-2 col-md-6">
              <strong>Price</strong>
              <input
                type="number"
                className="form-control"
                name="price"
                placeholder="Rs"
                value={inputData.price}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="my-2">
            <strong>Attachment</strong>
            <input
              type="file"
              name="file"
              accept=".jpeg, .png, .jpg"
              className="form-control"
              onChange={(e) => setimage(e.target.files)}
              multiple
            />
          </div>

          <div className="my-2">
            <strong>Description</strong>
            <textarea
              name="description"
              accept=".jpeg, .png, .jpg"
              className="form-control"
              onChange={handleChange}
              value={inputData.description}
              placeholder="Enter description"
            ></textarea>
          </div>
        </Modal.Body>
        <Modal.Footer className="bg-light">
          <button
            className="btnHover bg-dark "
            onClick={() => {
              setPropertyModal(false);
              setUpdateState(-1);
              setInputData({
                title: "",
                location: "",
                price: "",
                size: "",
                bedrooms: "",
                bathrooms: "",
                buyOrRent: "",
                cityId: "",
                propertyType: "",
                phone: "",
                description: "",
              });
            }}
          >
            Cancel
          </button>
          {updateState === -1 ? (
            <button className="btnHover" onClick={handlePostProperty}>
              Save
            </button>
          ) : (
            <button className="btnHover" onClick={handleUpdateProperty}>
              Update
            </button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MyProperty;
