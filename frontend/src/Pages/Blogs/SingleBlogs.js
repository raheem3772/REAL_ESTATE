import React, { useEffect, useState } from "react";
import Pic from "../../assets/bgHome.png";
import "./Blogs.css";
import axios from "axios";
import { BASE_URL } from "../../BaseRealEstate";
import { Button } from "react-bootstrap";
import AvatarPic from "../../assets/avatar.png";
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
      <h1 className="text-center text-success ">{blogSingleData.title}</h1>
      <div className="d-flex justify-content-center">
        <img
          className="imageBlogSingle"
          src={blogSingleData !== {} && BASE_URL + "/" + blogSingleData.image}
          alt=""
        />
      </div>
      <div className="descriptionBlogSingle">
        <p>{blogSingleData.content}</p>
        <div>
          <strong className="text-success ">
            Author: {blogUserData.username} <br />
            Publish Date:{" "}
            {blogSingleData.publish_date !== undefined &&
              blogSingleData.publish_date.split("T", 1)}
            <br />
          </strong>
        </div>
      </div>
      <div className="container d-flex justify-content-evenly my-4"></div>
      <Card className="cardMainAgencySingle">
        <CardBody>
          <CardTitle tag="h1">Leave a Comment</CardTitle>
          {commentsData
            .filter((item) => item.blog_id === _id)
            .map((val, i) => {
              const user = userData.find((item) => item._id === val.author_id);
              return (
                <div
                  key={val._id}
                  className="reviews-top mt-4 px-lg-4 py-1 rounded-3 "
                >
                  <div className="user-details">
                    <CardImg
                      className="avatar"
                      src={
                        user !== null && user !== undefined
                          ? BASE_URL + "/" + user.image
                          : AvatarPic
                      }
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
                    <small className="text-muted text-bold"></small>
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
