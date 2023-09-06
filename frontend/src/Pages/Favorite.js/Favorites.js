import React, { useEffect, useState } from "react";
import "./Favorites.css";
import CardComponent from "../../Components/CardComponent";
import axios from "axios";
import { BASE_URL } from "../../BaseRealEstate";
const Favorites = () => {
  const user_id = localStorage.getItem("user_Id");
  const [favApiData, setFavApiData] = useState([]);
  const [proprtyData, setProprtyData] = useState([]);
  const [userData, setUserData] = useState([]);
  const getDataAPI = async () => {
    await axios
      .get(BASE_URL + "/users/")
      .then((val) => {
        // const userId = localStorage.getItem("user_Id");
        // const data = val.data.filter((item) => item._id === userId);
        setUserData(val.data);
      })
      .catch((e) => console.log(e));
    await axios
      .get(BASE_URL + "/favorites/")
      .then((val) => {
        setFavApiData(val.data);
      })
      .catch((e) => console.log(e));
    await axios
      .get(BASE_URL + "/properties/")
      .then((val) => {
        setProprtyData(val.data);
        // val.data.map((item,i)=>{
        //   const filterData
        // })
      })
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    getDataAPI();
  }, []);
  return (
    <div className="container my-4">
      <h1 className="text-center">Favorite Properties</h1>
      <div className="container favCardsMain row">
        {favApiData
          .filter((val) => val.user_id === user_id)
          .map((val) => {
            const propertiess = proprtyData.find(
              (item) => item._id === val.property_id
            );
            return (
              <div className="favCard col-md-4">
                <CardComponent
                  file={propertiess !== undefined && propertiess.image[0]}
                  title={propertiess !== undefined && propertiess.title}
                  price={propertiess !== undefined && propertiess.price + " $"}
                  location={propertiess !== undefined && propertiess.location}
                  bedrooms={propertiess !== undefined && propertiess.bedrooms}
                  size={propertiess !== undefined && propertiess.size}
                  rating={null}
                  handlePostFav={() => {}}
                  property_id={propertiess !== undefined && propertiess._id}
                  fav_id={propertiess !== undefined && propertiess._id}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Favorites;
