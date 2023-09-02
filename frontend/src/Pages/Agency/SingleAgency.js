import React, { useEffect, useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "./SingleAgencyMain.css";
import Pic from "../../assets/Dash1.png";
import axios from "axios";
import Avatar from "../../assets/avatar.png";

import {
  Card,
  CardSubtitle,
  CardText,
  CardTitle,
  CardBody,
  CardImg,
  Form,
  Input,
} from "reactstrap";
import { BASE_URL } from "../../BaseRealEstate";
const SingleAgency = ({ token, adminId }) => {
  const [userData, setUserData] = useState([]);
  const [ratingsStar, setratingsStar] = useState([]);
  const [reloadReviewsBool, setReloadReviewsBool] = useState(false);
  const user_id = localStorage.getItem("user_Id");
  const [reviewsData, setReviewsData] = useState([]);
  const [inputData, setInputData] = useState({ review_text: "", rating: 0 });
  const { _id } = useParams();
  const [agencySingleData, setAgencySingleData] = useState({});
  const getDataById = async () => {
    await axios
      .get(BASE_URL + "/agencyMain/" + _id)
      .then((val) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
          if (i <= val.data["rating"]) {
            stars.push("⭐");
          } else {
            stars.push("☆");
          }
        }
        setratingsStar(stars);
        setAgencySingleData(val.data);
      })
      .catch((e) => console.log(e));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };
  const handlePostReviews = async () => {
    const { review_text, rating } = inputData;
    await axios
      .post(BASE_URL + "/reviews/", {
        user_id,
        agency_id: _id,
        rating,
        review_text,
      })
      .then((val) => {
        setReloadReviewsBool(!reloadReviewsBool);
        setInputData({ review_text: "", rating: 0 });
      })
      .catch((e) => console.log(e));
  };
  const getReviewsData = async () => {
    await axios
      .get(BASE_URL + "/reviews/")
      .then((val) => setReviewsData(val.data))
      .catch((e) => console.log(e));
    await axios
      .get(BASE_URL + "/users/")
      .then((val) => setUserData(val.data))
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    getDataById();
  }, []);
  useEffect(() => {
    getReviewsData();
  }, [reloadReviewsBool]);

  return (
    <div className="singleAgencyMain">
      <div className=" container containers">
        <div className="row  rowDivMain">
          <div className="col-md-6 ">
            <img
              className="imgMainSingleAgency"
              src={BASE_URL + "/" + agencySingleData.image}
              alt=""
            />
          </div>
          <div className="col-md-6 d-flex justify-content-center flex-column align-items-start ">
            <h2 className="textClrs">
              {_id === undefined || _id === null
                ? "Loading..."
                : agencySingleData.username}
            </h2>
            <h5>
              Contact Info:{" "}
              <span className="textClrs">
                {_id === undefined || _id === null
                  ? "Loading..."
                  : agencySingleData.contactInfo}
              </span>
            </h5>
            <h6 className="my-4">
              {_id === undefined || _id === null
                ? "Loading..."
                : agencySingleData.description}
            </h6>
            {/* <strong>
              {_id === undefined || _id === null
                ? "Loading..."
                : `Ratings: ${ratingsStar.join("")}`}
            </strong> */}
            {adminId!==null&&
              
              adminId.includes(user_id) && (
              <button
                className="btnHover"
                onClick={() => {
                  window.open(BASE_URL + "/" + agencySingleData.docs, "_blank");

                  console.log(BASE_URL + "/" + agencySingleData.docs);
                }}
              >
                Check Docs
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="container d-flex justify-content-evenly my-4">
        {/* <div className="d-flex justify-content-center align-items-center flex-column">
          <textarea
            placeholder="Type here"
            name="review_text"
            id="review_text"
            value={inputData.review_text}
            className="inputReviews"
            onChange={handleChange}
          ></textarea>
          <input
            type="number"
            className="inputReview my-2"
            value={inputData.rating}
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={handlePostReviews}
            class="btnHover1 mt-2"
          >
            Send
          </button>
        </div> */}
      </div>
      <Card className="cardMainAgencySingle">
        <CardBody>
          <CardTitle tag="h1">Reviews of Agency</CardTitle>
          {reviewsData
            .filter((item) => item.agency_id === _id)
            .map((val, i) => {
              const stars = [];
              for (let i = 1; i <= 5; i++) {
                if (i <= val.rating) {
                  stars.push("⭐");
                } else {
                  stars.push("☆");
                }
              }

              const ratingsArray = new Array(parseInt(val.rating)).fill(null);
              const user = userData.find((item) => item._id === val.user_id);
              return (
                <div key={val._id} className="reviews-top mt-4">
                  <div className="user-details">
                    <CardImg
                      className="avatar"
                      src={
                        user !== null && user !== undefined
                          ? BASE_URL + "/" + user.image
                          : Avatar
                      }
                      alt=""
                    />
                    <CardSubtitle className="mb-2 text-muted" tag="h6">
                      {user !== undefined && user.username}
                    </CardSubtitle>
                    <CardSubtitle tag="h5">{stars.join("")} </CardSubtitle>
                  </div>
                  <div className="reviews-body ">
                    <CardText className="my-2">{val.review_text}</CardText>
                  </div>
                  <CardText>
                    <small className="text-muted text-bold">
                      {/* {timestamp || "3 mins ago"} */}
                    </small>
                  </CardText>
                </div>
              );
            })}
        </CardBody>
      </Card>
      {token !== null && (
        <div className="form-container mt-4">
          <Input
            className="reviews-form"
            type="text"
            name="review_text"
            placeholder="enter you reviews"
            value={inputData.review_text}
            onChange={handleChange}
          />
          <Input
            min="0"
            max="5"
            className="reviews-form"
            type="number"
            name="rating"
            placeholder="Enter you reviews"
            value={inputData.rating}
            onChange={handleChange}
          />
          <Button
            type="button"
            onClick={handlePostReviews}
            className="mx-3 btnHover"
          >
            Submit
          </Button>
        </div>
      )}
    </div>
  );
};

export default SingleAgency;
