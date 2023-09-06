import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../BaseRealEstate";
import { motion } from "framer-motion";
import CardComponent from "../../Components/CardComponent";
import "./Search.css";
const Search = ({
  token,
  setMinPrice,
  setMaxPrice,
  minPrice,
  maxPrice,
  setDropdownSearch,
  dropdownSearch,
  refreshSearchData,
}) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const user_id = localStorage.getItem("user_Id");
  const [favApiData, setFavApiData] = useState([]);
  const [searchPropertyData, setSearchPropertyData] = useState([]);
  const getCitySearch = async () => {
    await axios
      .get(BASE_URL + "/properties/city/" + id, {
        params: {
          minPrice: minPrice,
          maxPrice: maxPrice,
        },
      })
      .then((val) => {
        setSearchPropertyData(val.data);
      })
      .catch((e) => console.log(e));
    await axios
      .get(BASE_URL + "/favorites/")
      .then((val) => {
        setFavApiData(val.data);
      })
      .catch((e) => console.log(e));
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
  useEffect(() => {
    getCitySearch();
  }, [id, refreshSearchData]);
  return (
    <div className="my-4">
      <h1 className="text-center">
        Search Results:{" "}
        {
          searchPropertyData.filter((val) =>
            val.title.toLowerCase().includes(dropdownSearch.toLowerCase())
          ).length
        }
      </h1>
      <div className="container propertyCardsMain searchContainerBar row">
        {searchPropertyData
          .filter((val) =>
            val.title.toLowerCase().includes(dropdownSearch.toLowerCase())
          )
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
                  handleMessage={() => {
                    navigate("/messages/" + val._id);
                  }}
                />
              </motion.div>
            );
          })}
      </div>
    </div>
  );
};

export default Search;
