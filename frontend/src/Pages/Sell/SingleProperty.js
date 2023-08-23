import React, { useEffect, useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "../Agency/SingleAgencyMain.css";
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
const SingleProperty = ({ token }) => {
  const [userData, setUserData] = useState([]);
  const [ratingsStar, setratingsStar] = useState([]);
  const [reloadReviewsBool, setReloadReviewsBool] = useState(false);
  const user_id = localStorage.getItem("user_Id");
  const [reviewsData, setReviewsData] = useState([]);
  const [inputData, setInputData] = useState({ review_text: "", rating: 0 });
  const { _id } = useParams();
  const [propertySingleData, setpropertySingleData] = useState({});
  const [imagesProperty, setimagesProperty] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const getDataById = async () => {
    await axios
      .get(BASE_URL + "/properties/" + _id)
      .then((val) => {
        setpropertySingleData(val.data);
        setimagesProperty(val.data["image"]);
      })
      .catch((e) => console.log(e));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  useEffect(() => {
    getDataById();
    console.log(imagesProperty);
  }, [imagesProperty]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imagesProperty.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [imagesProperty.length]);

  return (
    <div className="singleAgencyMain">
      <div className=" container containers">
        <div className="row  rowDivMain">
          <div className="col-md-6 ">
            <img
              className="imgMainSingleAgency"
              src={BASE_URL + "/" + imagesProperty[currentIndex]}
              alt=""
            />
          </div>
          <div className="col-md-6 d-flex justify-content-center flex-column">
            <h2 className="textClrs">
              {_id === undefined || _id === null
                ? "Loading..."
                : propertySingleData.title}
            </h2>
            <pre>
              <strong>
                Location:
                <span className="textClrs">
                  {_id === undefined || _id === null
                    ? "Loading..."
                    : propertySingleData.location}
                </span>
              </strong>
              <br />
              <strong>
                Price:
                <span className="textClrs">
                  {_id === undefined || _id === null
                    ? "Loading..."
                    : propertySingleData.price}
                </span>
              </strong>
              <br />
              <strong>
                Size:
                <span className="textClrs">
                  {_id === undefined || _id === null
                    ? "Loading..."
                    : propertySingleData.size + " sq/ft"}
                </span>
              </strong>
              <br />
              <strong>
                Bedrooms:
                <span className="textClrs">
                  {_id === undefined || _id === null
                    ? "Loading..."
                    : propertySingleData.bedrooms}
                </span>
              </strong>
              <br />
              <strong>
                Bathrooms:
                <span className="textClrs">
                  {_id === undefined || _id === null
                    ? "Loading..."
                    : propertySingleData.bathrooms}
                </span>
              </strong>
              <br />
              <strong>
                Contact:
                <span className="textClrs">
                  {_id === undefined || _id === null
                    ? "Loading..."
                    : propertySingleData.phone}
                </span>
              </strong>
              <br />
              <small className="my-4">
                {_id === undefined || _id === null
                  ? "Loading..."
                  : propertySingleData.description}
              </small>
            </pre>
            {/* <strong>
              {_id === undefined || _id === null
                ? "Loading..."
                : `Ratings: ${ratingsStar.join("")}`}
            </strong> <br /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProperty;
