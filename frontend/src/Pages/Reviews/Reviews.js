import axios from "axios";
import React, { useEffect, useState } from "react";
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
const Reviews = () => {
  const agencyId = localStorage.getItem("user_Id");
  const [userData, setUserData] = useState([]);
  const [reviewsData, setReviewsData] = useState([]);
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
    getReviewsData();
  }, []);

  return (
    <div>
      <h1 className="text-center my-4">Reviews</h1>
      <div>
        <Card className="cardMainAgencySingle">
          <CardBody>
            <CardTitle tag="h1">Reviews of Agency</CardTitle>
            {reviewsData
              .filter((item) => item.agency_id === agencyId)
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
                        src="https://images.pexels.com/photos/7129713/pexels-photo-7129713.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                        alt="user avatar"
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
      </div>
    </div>
  );
};

export default Reviews;
