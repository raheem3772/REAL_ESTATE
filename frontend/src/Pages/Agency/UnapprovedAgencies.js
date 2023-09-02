import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CardComponent from "../../Components/CardComponent";
import { BASE_URL } from "../../BaseRealEstate";

const UnApprovedAgencies = ({ token }) => {
  const user_id = localStorage.getItem("user_Id");
  const [booldRelaod, setBooldRelaod] = useState(false);
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [agencyData, setAgencyData] = useState([]);

  const getApiData = async () => {
    await axios
      .get(BASE_URL + "/agencymain/na")
      .then((val) => setAgencyData(val.data))
      .catch((e) => console.log(e));
    await axios
      .get(BASE_URL + "/users/")
      .then((val) => setUserData(val.data))
      .catch((e) => console.log(e));
  };
  const handleApproveAgency = async (id) => {
    await axios
      .put(BASE_URL + "/agencymain/approve/" + id, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((val) => {
        if (val.status === 200) {
          setBooldRelaod(!booldRelaod);
          window.alert("Agency verified successfully!");
        }
      })
      .catch((e) => {
        window.alert("Something went wrong!");
        console.log(e);
      });
  };
  const handleDeleteReq = async (id) => {
    await axios
      .delete(BASE_URL + "/agencymain/signup/" + id, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((val) => {
        if (val.status === 200) {
          setBooldRelaod(!booldRelaod);
          window.alert(val.data["message"]);
        }
      })
      .catch((e) => {
        window.alert("Something went wrong");
        console.log(e);
      });
  };
  useEffect(() => {
    getApiData();
  }, [booldRelaod]);

  return (
    <div className="container my-4">
      <div className="d-flex flex-column justify-content-center align-items-center">
        <h2>UnApproved Agency</h2>
      </div>
      <div className="container favCardsMain row">
        {agencyData.map((val) => {
          const user = userData.find((item) => item._id === val.user_id);
          const stars = [];
          for (let i = 1; i <= 5; i++) {
            if (i <= val.rating) {
              stars.push("⭐");
            } else {
              stars.push("☆");
            }
          }
          return (
            <motion.div
              whileTap={{ scale: 1.1 }}
              whileHover={{ scale: 1.05 }}
              className=" col-md-6 favCard curserPointer my-4"
            >
              <CardComponent
                handleReadMore={() => {
                  if (user_id !== null) {
                    navigate("/agencies/" + val._id);
                  }
                }}
                contactInfo={val.contactInfo}
                file={val.image}
                handlePostFav={() => {}}
                property_id={null}
                userName={user === undefined ? "Loading..." : user["username"]}
                title={val.username}
                description={val.description}
                size={null}
                bedrooms={null}
                price={null}
                location={null}
                rating={stars}
                handleApproveAgency={handleApproveAgency}
                agency_id={val._id}
                handleDeleteReq={handleDeleteReq}
                isApproved={val.isApproved}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default UnApprovedAgencies;
