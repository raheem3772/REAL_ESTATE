import React, { useEffect, useState } from "react";
import "./Messages.css";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { BASE_URL } from "../../BaseRealEstate";
import { useParams } from "react-router-dom";
const Messages = () => {
  const [idChatUser, setIdChatUser] = useState(null);
  const [chatUsers, setChatUsers] = useState([]);
  const { id } = useParams();
  const [uid, setUid] = useState();
  const [propertyId, setPropertyId] = useState();
  const [reloadMessagesBool, setReloadMessagesBool] = useState(false);
  const [propertyData, setPropertyData] = useState();
  const user_id = localStorage.getItem("user_Id");
  const [userData, setUserData] = useState([]);
  const [messagesData, setMessagesData] = useState([]);
  const [message_text, setMessage_text] = useState("");
  const getDataApi = async () => {
    await axios
      .get(BASE_URL + "/users/")
      .then((val) => {
        setUserData(val.data);
      })
      .catch((e) => console.log(e));
    await axios
      .get(BASE_URL + "/messages/" + user_id)
      .then((val) => {
        const arr = [];
        val.data.map((item) => {
          if (item.sender_id === user_id && !arr.includes(item.receiver_id)) {
            arr.push(item.receiver_id);
          } else if (
            item.receiver_id === user_id &&
            !arr.includes(item.sender_id)
          ) {
            arr.push(item.sender_id);
          }
        });
        setChatUsers(arr);

        setMessagesData(val.data);
      })
      .catch((e) => console.log(e));

    await axios
      .get(BASE_URL + "/properties/" + id)
      .then((val) => {
        setPropertyId(val.data["user_id"]);
        setIdChatUser(val.data["user_id"]);
        setPropertyData(val.data);
      })
      .catch((e) => console.log(e));
  };
  const handlePostMessage = async () => {
    await axios
      .post(
        BASE_URL + "/messages/",
        {
          message_text,
          sender_id: user_id,
          receiver_id: propertyData.user_id,
          property_id: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((val) => {
        setReloadMessagesBool(!reloadMessagesBool);
        setMessage_text("");

        console.log(val);
      })
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    id === undefined ? getDataApi() : getOnlyMessageByProperty();
  }, [reloadMessagesBool]);
  const getOnlyMessageByProperty = async () => {
    await axios
      .get(BASE_URL + "/users/")
      .then((val) => {
        setUserData(val.data);
      })
      .catch((e) => console.log(e));
    await axios
      .get(BASE_URL + "/messages/property/" + id, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((val) => {
        const arr = [];
        val.data.map((item) => {
          if (item.sender_id === user_id && !arr.includes(item.receiver_id)) {
            arr.push(item.receiver_id);
          } else if (
            item.receiver_id === user_id &&
            !arr.includes(item.sender_id)
          ) {
            arr.push(item.sender_id);
          }
        });
        setChatUsers(arr);

        setMessagesData(val.data);
      })
      .catch((e) => console.log(e));
    await axios
      .get(BASE_URL + "/properties/" + id)
      .then((val) => {
        setPropertyId(val.data["user_id"]);
        setIdChatUser(val.data["user_id"]);
        setPropertyData(val.data);
      })
      .catch((e) => console.log(e));
  };
  return (
    <div className="msgMain">
      <div className="userList">
        {id === undefined
          ? userData
              .filter((val) => chatUsers.includes(val._id))
              .map((val, i) => {
                return (
                  <div
                    onClick={() => {
                      setIdChatUser(val._id);
                    }}
                    className="userChatCard"
                  >
                    <div className="avatar">{val.username[0]}</div>
                    <div className="d-flex flex-column">
                      <small>{val.username}</small>
                      <small>I'm a React Developer!</small>
                    </div>
                    <div className="d-flex flex-column align-items-center">
                      <small>Last Seen</small>
                      <small>02:39</small>
                    </div>
                  </div>
                );
              })
          : userData
              .filter((val) => val._id === propertyId)
              .map((val, i) => (
                <div className="userChatCard">
                  <div className="avatar">{val.username[0]}</div>
                  <div className="d-flex flex-column">
                    <small>{val.username}</small>
                    <small>I'm a React Developer!</small>
                  </div>
                  <div className="d-flex flex-column align-items-center">
                    <small>Last Seen</small>
                    <small>02:39</small>
                  </div>
                </div>
              ))}
      </div>
      <div className="userChat">
        <div className="chatDiv">
          {messagesData
            .filter(
              (item) =>
                item.receiver_id === idChatUser || item.sender_id === idChatUser
            )
            .map((val, i) => (
              <div
                className={
                  val.sender_id === user_id
                    ? "singleChatMessagee"
                    : "singleChatMessages"
                }
              >
                <div
                  className={
                    val.sender_id === user_id ? "chatMessagee" : "chatMessages"
                  }
                >
                  {val.message_text}
                </div>
              </div>
            ))}
        </div>
        {/* {idChatUser !== null && ( */}
        <div className="inputButton">
          <input
            type="text"
            placeholder="Enter text"
            name="content"
            id="content"
            className="messageField"
            value={message_text}
            onChange={(e) => setMessage_text(e.target.value)}
          />
          <button className="btnSend" onClick={handlePostMessage}>
            <SendIcon sx={{ fontSize: "1.5rem" }} />
          </button>
        </div>
        {/* )} */}
      </div>
    </div>
  );
};

export default Messages;
