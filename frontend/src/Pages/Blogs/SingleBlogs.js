import React, { useEffect, useState } from "react";
import Pic from "../../assets/bgHome.png";
import "./Blogs.css";
import axios from "axios";
import { BASE_URL } from "../../BaseRealEstate";
import { Button } from "react-bootstrap";
import {
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
  Input,
} from "reactstrap";
import { useParams } from "react-router-dom";
const SingleBlogs = ({ token }) => {
  const [blogUserData, setBlogUserData] = useState({});
  const [userData, setUserData] = useState([]);
  const [reloadCommentsBool, setReloadCommentsBool] = useState(false);
  const user_id = localStorage.getItem("user_Id");
  const [commentsData, setCommentsData] = useState([]);
  const [inputData, setInputData] = useState({ content: "" });
  const { _id } = useParams();
  const [blogSingleData, setBlogSingleData] = useState({});
  const getDataById = async () => {
    let idUser = null;
    await axios
      .get(BASE_URL + "/blogs/" + _id)
      .then((val) => {
        idUser = val.data["author_id"];
        console.log(idUser);
        setBlogSingleData(val.data);
      })
      .catch((e) => console.log(e));
    await axios
      .get(BASE_URL + "/users/" + idUser)
      .then((val) => {
        setBlogUserData(val.data);
      })
      .catch((e) => console.log(e));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };
  const getCommentsData = async () => {
    await axios
      .get(BASE_URL + "/comments/")
      .then((val) => setCommentsData(val.data))
      .catch((e) => console.log(e));
    await axios
      .get(BASE_URL + "/users/")
      .then((val) => setUserData(val.data))
      .catch((e) => console.log(e));
  };
  const handlePostComments = async () => {
    const { content } = inputData;
    await axios
      .post(
        BASE_URL + "/comments/",
        {
          content,
          author_id: user_id,
          blog_id: _id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((val) => {
        console.log(val);
        if (val.status == 201) {
          setReloadCommentsBool(!reloadCommentsBool);
          setInputData({
            content: "",
          });
        }
      })
      .catch((e) => console.warn(e));
  };
  useEffect(() => {
    getDataById();
  }, []);
  useEffect(() => {
    getCommentsData();
  }, [reloadCommentsBool]);

  return (
    <div className="singleAgencyMain">
      <div className=" container containers">
        <div className="row  rowDivMain">
          <div className="col-md-6 ">
            <img
              className="imgMainSingleAgency"
              src="https://mdbootstrap.com/img/new/standard/nature/111.webp"
              alt=""
            />
          </div>
          <div className="col-md-6 d-flex justify-content-center flex-column">
            <h2 className="text-black">{blogSingleData.title}</h2>
            <p>{blogSingleData.content}</p>
            <strong>{blogUserData.username}</strong>
            <strong>
              {blogSingleData.publish_date !== undefined &&
                blogSingleData.publish_date.split("T", 1)}
            </strong>
          </div>
        </div>
      </div>
      <div className="container d-flex justify-content-evenly my-4"></div>
      <Card className="cardMainAgencySingle">
        <CardBody>
          <CardTitle tag="h1">Comments</CardTitle>
          {commentsData
            .filter((item) => item.blog_id === _id)
            .map((val, i) => {
              const user = userData.find((item) => item._id === val.author_id);
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
                    <CardSubtitle tag="h5"> </CardSubtitle>
                  </div>
                  <div className="reviews-body ">
                    <CardText className="my-2 dyn-height">
                      {val.content}
                    </CardText>
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
            name="content"
            placeholder="Enter you comments"
            value={inputData.content}
            onChange={handleChange}
          />

          <Button
            type="button"
            onClick={handlePostComments}
            className="mx-3 btnHover"
          >
            Submit
          </Button>
        </div>
      )}
    </div>
  );
};

export default SingleBlogs;
