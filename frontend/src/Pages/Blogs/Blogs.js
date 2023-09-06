import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { BASE_URL } from "../../BaseRealEstate";
import { motion } from "framer-motion";
import "./Blogs.css";
import { Navigate, useNavigate } from "react-router-dom";
const Blogs = ({ token }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [blogsDataApi, setBlogsDataApi] = useState([]);
  const [image, setimage] = useState("");
  const user_id = localStorage.getItem("user_Id");
  const [inputData, setInputData] = useState({
    title: "",
    content: "",
  });
  const [blogsModalShow, setBlogsModalShow] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };
  const handlePostBlog = async () => {
    const { title, content } = inputData;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("author_id", user_id);
    formData.append("image", image);

    await axios
      .post(BASE_URL + "/blogs/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((val) => {
        console.log(val);
        if (val.status == 201) {
          window.alert(val.statusText);
          setBlogsModalShow(false);
          setInputData({
            title: "",
            content: "",
          });
        }
      })
      .catch((e) => console.warn(e));
  };
  const getApiData = async () => {
    await axios
      .get(BASE_URL + "/blogs/")
      .then((val) => setBlogsDataApi(val.data))
      .catch((e) => console.log(e));
    await axios
      .get(BASE_URL + "/users/")
      .then((val) => setUserData(val.data))
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    getApiData();
  }, [blogsModalShow]);
  return (
    <div className="mainBlogss">
      <div className="d-flex flex-column justify-content-center align-items-center">
        <h2>Blogs</h2>
        {token !== null && (
          <button
            className="btnHover mt-3"
            onClick={() => setBlogsModalShow(true)}
          >
            <AddIcon /> Add Blog
          </button>
        )}
      </div>

      <div className=" container containers ">
        {blogsDataApi.map((val, i) => {
          const user = userData.find((item) => item._id === val.author_id);
          return (
            <motion.div
              whileTap={{ scale: 1.1 }}
              whileHover={{ scale: 1.05 }}
              className="row  rowDivMainBlog curserPointer"
              onClick={() => navigate("/blog/" + val._id)}
            >
              <div className="col-md-4 ">
                <img
                  className="imgMainSingleBlog"
                  src={BASE_URL + "/" + val.image}
                  alt=""
                />
              </div>
              <div className=" blogContentMain col-md-8 overflow-hidden d-flex justify-content-center flex-column">
                <h2 className="text-black  titleBlog">{val.title}</h2>
                <p className="eclipse">{val.content}</p>
                <strong>{user !== undefined && user.username}</strong>
                <strong>{val.publish_date.split("T", 1)}</strong>
              </div>
            </motion.div>
          );
        })}
      </div>
      <Modal
        show={blogsModalShow}
        onHide={() => {
          setBlogsModalShow(false);
          setInputData({
            title: "",
            content: "",
          });
        }}
      >
        <Modal.Header className="bg-light" closeButton>
          <Modal.Title>Add Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="my-2">
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
          <div className="my-2">
            <strong>Content</strong>
            <textarea
              type="text"
              className="form-control"
              name="content"
              placeholder="Type here"
              value={inputData.content}
              onChange={handleChange}
            />
          </div>
          <div className="my-2">
            <strong>Attachment</strong>
            <input
              type="file"
              name="file"
              accept=".jpeg, .png, .jpg"
              className="form-control"
              onChange={(e) => setimage(e.target.files[0])}
            />
          </div>
        </Modal.Body>
        <Modal.Footer className="bg-light">
          <button
            className="btnHover bg-dark "
            onClick={() => {
              setBlogsModalShow(false);
              setInputData({
                title: "",
                content: "",
              });
            }}
          >
            Cancel
          </button>
          <button className="btnHover" onClick={handlePostBlog}>
            Save
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Blogs;
