import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { BASE_URL } from "../../BaseApiUrl";
import { useNavigate } from "react-router-dom";
import CardComponent from "../../Components/CardComponent";
import AddIcon from "@mui/icons-material/Add";

const Agencies = ({ token, adminId }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [agencyData, setAgencyData] = useState([]);
  const user_id = localStorage.getItem("user_Id");
  const [agencyModal, setAgencyModal] = useState(false);
  const [inputData, setInputData] = useState({
    name: "",
    rating: 0,
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };
  const handlePostAgency = async () => {
    const { name, rating, description } = inputData;
    await axios
      .post(
        BASE_URL + "/agencies/",
        {
          name,
          rating,
          description,
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
        setAgencyModal(false);
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
  const getApiData = async () => {
    await axios
      .get(BASE_URL + "/agencies/")
      .then((val) => setAgencyData(val.data))
      .catch((e) => console.log(e));
    await axios
      .get(BASE_URL + "/users/")
      .then((val) => setUserData(val.data))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getApiData();
  }, [agencyModal]);
  return (
    <div className="container my-4">
      <div className="d-flex flex-column justify-content-center align-items-center">
        <h2>Agency</h2>
        {adminId !== null && adminId.includes(user_id) && (
          <button
            className="btnHover mt-3"
            onClick={() => navigate("/unapprovedagencies")}
          >
            Unapproved Agencies
          </button>
        )}
        {token !== null && (
          <button
            className="btnHover mt-3"
            onClick={() => setAgencyModal(true)}
          >
            <AddIcon /> Add Agency
          </button>
        )}
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
              onClick={() => {
                if (user_id !== null) {
                  navigate("/agencies/" + val._id);
                }
              }}
              whileTap={{ scale: 1.1 }}
              whileHover={{ scale: 1.05 }}
              className=" col-md-6 favCard curserPointer my-4"
            >
              <CardComponent
                handlePostFav={() => {}}
                property_id={null}
                userName={user === undefined ? "Loading..." : user["username"]}
                title={val.name}
                description={val.description}
                size={null}
                bedrooms={null}
                price={null}
                location={null}
                rating={stars}
              />
            </motion.div>
          );
        })}
      </div>
      <Modal
        show={agencyModal}
        onHide={() => {
          setAgencyModal(false);
          setInputData({
            name: "",
            rating: 0,
            description: "",
          });
        }}
      >
        <Modal.Header className="bg-light" closeButton>
          <Modal.Title>Add Agency</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="my-2">
            <strong>Name</strong>
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Type here"
              value={inputData.name}
              onChange={handleChange}
            />
          </div>
          <div className="my-2">
            <strong>Ratings</strong>
            <input
              type="number"
              className="form-control"
              name="rating"
              placeholder="1-5"
              value={inputData.rating}
              onChange={handleChange}
            />
          </div>
          <div className="my-2">
            <strong>Description</strong>
            <textarea
              type="number"
              className="form-control"
              name="description"
              placeholder="Type here"
              value={inputData.description}
              onChange={handleChange}
            />
          </div>
        </Modal.Body>
        <Modal.Footer className="bg-light">
          <button
            className="btnHover bg-dark "
            onClick={() => {
              setAgencyModal(false);
              setInputData({
                name: "",
                rating: 0,
                description: "",
              });
            }}
          >
            Cancel
          </button>
          <button className="btnHover" onClick={handlePostAgency}>
            Save
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Agencies;
// <div>
//   <div className="contentMain">
//     <input
//       type="search"
//       className="col-md-4 searchInput"
//       placeholder="Search..."
//     />
//   </div>
//   <div className="row">
//     <div className=" contentdiv">
//       <div className=" col-md-6 shapeDiv  ">
//         <motion.h2
//           animate={{ x: [50, 50, 50], opacity: 1, scale: 1 }}
//           transition={{
//             duration: 2,
//             delay: 0.5,
//             ease: [0.5, 0.71, 1, 1.5],
//           }}
//           initial={{ opacity: 0, scale: 0.5 }}
//           whileHover={{ scale: 1.2 }}
//           className=" h1Tag"
//         >
//           Agencies
//         </motion.h2>
//         <motion.div
//           animate={{ x: [50, 50, 50], opacity: 1, scale: 1 }}
//           transition={{
//             duration: 2,
//             delay: 0.5,
//             ease: [0.5, 0.71, 1, 1.5],
//           }}
//           className="pDiv"
//         >
//           <p className="  text-justify">
//             Lorem Ipsum is simply dummy text of the printing and typesetting
//             industry. Lorem Ipsum has been the industry's standard dummy
//             text ever since the 1500s. Lorem Ipsum is simply dummy text of
//             the printing and typesetting industry. Lorem Ipsum has been the
//             industry's standard dummy text ever since the 1500s.
//           </p>
//           <motion.button
//             whileTap={{ scale: 1.3 }}
//             whileHover={{ scale: 1.1 }}
//             className="btnHover"
//           >
//             Learn more
//           </motion.button>
//         </motion.div>
//       </div>
//     </div>
//   </div>
//   <div className="my-4 propertyDiv ">
//     <Modal
//       show={agencyModal}
//       onHide={() => {
//         setAgencyModal(false);
//         setInputData({
//           name: "",
//           rating: 0,
//           description: "",
//         });
//       }}
//     >
//       <Modal.Header className="bg-light" closeButton>
//         <Modal.Title>Add Agency</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <div className="my-2">
//           <strong>Name</strong>
//           <input
//             type="text"
//             className="form-control"
//             name="name"
//             placeholder="Type here"
//             value={inputData.name}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="my-2">
//           <strong>Ratings</strong>
//           <input
//             type="number"
//             className="form-control"
//             name="rating"
//             placeholder="1-5"
//             value={inputData.rating}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="my-2">
//           <strong>Description</strong>
//           <textarea
//             type="number"
//             className="form-control"
//             name="description"
//             placeholder="Type here"
//             value={inputData.description}
//             onChange={handleChange}
//           />
//         </div>
//       </Modal.Body>
//       <Modal.Footer className="bg-light">
//         <button
//           className="btnHover bg-dark "
//           onClick={() => {
//             setAgencyModal(false);
//             setInputData({
//               name: "",
//               rating: 0,
//               description: "",
//             });
//           }}
//         >
//           Cancel
//         </button>
//         <button className="btnHover" onClick={handlePostAgency}>
//           Save
//         </button>
//       </Modal.Footer>
//     </Modal>
//     <div className="container d-flex justify-content-center">
//       {token !== null ? (
//         <button
//           className="btnHover1"
//           onClick={() => {
//             setAgencyModal(true);
//           }}
//         >
//           Add Agency
//         </button>
//       ) : null}
//     </div>
//     <motion.div
//       initial="hidden"
//       animate="visible"
//       variants={{
//         hidden: {
//           scale: 0.8,
//           opacity: 0,
//         },
//         visible: {
//           scale: 1,
//           opacity: 1,
//           transition: {
//             delay: 0.4,
//           },
//         },
//       }}
//       className=" row my-4 "
//     >
//       {agencyData.map((val) => {
//         const user = userData.find((item) => item._id === val.user_id);
//         return (
//           <motion.div
//             onClick={() => {
//               navigate("/agency/" + val._id);
//             }}
//             whileTap={{ scale: 1.1 }}
//             whileHover={{ scale: 1.05 }}
//             className=" col-md-6 curserPointer my-4"
//           >
//             <CardComponent
//               handlePostFav={() => {}}
//               property_id={val._id}
//               userName={
//                 user === undefined ? "Loading..." : user["username"]
//               }
//               title={val.name}
//               price={val.rating + " stars"}
//               location={val.description}
//               rating={val.rating}
//             />
//           </motion.div>
//         );
//       })}
//     </motion.div>
//   </div>
// </div>
