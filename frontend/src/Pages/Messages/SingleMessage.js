import React, { useEffect, useState } from "react";
import "./Messages.css";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { BASE_URL } from "../../BaseRealEstate";
import { useParams } from "react-router-dom";
const SingleMessage = () => {
  const [agencyMainData, setAgencyMainData] = useState();
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
          receiver_id: agencyMainData!==undefined&&agencyMainData._id,
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

  const getOnlyMessageByProperty = async () => {
    await axios
      .get(BASE_URL + "/users/")
      .then((val) => {
        setUserData(val.data);
      })
      .catch((e) => console.log(e));
    await axios
      .get(BASE_URL + "/messages/" + user_id, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((val) => {
        console.log(val.data);
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

  const getAgencyDataMain = async () => {
    await axios
      .get(BASE_URL + "/agencymain/" + id)
      .then((val) => {
        // setPropertyId(val.data["user_id"]);
        // setIdChatUser(val.data["user_id"]);
        setAgencyMainData(val.data);
      })
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    getAgencyDataMain();
  });
  useEffect(() => {
    getOnlyMessageByProperty();
  }, [reloadMessagesBool]);
  return (
    <div className="msgMain">
      <div className="userList">
        <div className="userChatCard">
          <div className="avatar"></div>
          <div className="d-flex flex-column">
            <small>
              {agencyMainData !== undefined && agencyMainData.username}
            </small>
            <small>I'm a React Developer!</small>
          </div>
          <div className="d-flex flex-column align-items-center">
            <small>Last Seen</small>
            <small>02:39</small>
          </div>
        </div>
      </div>

      <div className="userChat">
        <div className="chatDiv">
          {messagesData
            .filter(
              (item) =>
                agencyMainData !== undefined &&
                (item.receiver_id === agencyMainData._id ||
                  item.sender_id === agencyMainData._id)
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

export default SingleMessage;
