import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBCardTitle,
  MDBRipple,
} from "mdb-react-ui-kit";
import { Button, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { BASE_URL } from "../BaseRealEstate";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CallIcon from "@mui/icons-material/Call";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { useNavigate } from "react-router-dom";

const CardComponent = ({
  title,
  price,
  bedrooms,
  size,
  location,
  isApproved,
  rating,
  handlePostFav,
  property_id,
  fav_id,
  description,
  handleMessage,
  currentUser,
  uid,
  handleApproveAgency,
  agency_id,
  handleDeleteReq,
  adminId,
  file,
  handlePostFeature,
  is_featured,
  handleRemoveFeature,
  editProperty,
  handleEdit,
  handleDeleteProperty,
  contactInfo,
  calIconNav,
  handleReadMore,
}) => {
  const navigate = useNavigate();
  const [favPropertyBool, setFavPropertyBool] = useState(false);
  useEffect(() => {
    if (property_id === fav_id) {
      setFavPropertyBool(true);
    } else if (property_id === fav_id) {
      setFavPropertyBool(true);
    }
  }, []);
  return (
    <MDBCard
      style={{
        height: property_id === null ? "450px" : "560px",
      }}
      className="bg-white cardCompMain"
    >
      <MDBRipple
        style={{
          height: "300px",
        }}
        // rippleColor="light"
        rippleTag="div"
        className="bg-image bg-white hover-overlay"
      >
        <MDBCardImage
          style={{
            height: "250px",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundImage: `url(${BASE_URL + "/" + file})`,
            backgroundColor: "green",
          }}
          src={BASE_URL + "/" + file}
          fluid
          alt="..."
          className="bg-white"
        />
        <a>
          <div
            className="mask"
            style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
          ></div>
        </a>
      </MDBRipple>
      <MDBCardBody
        className="bg-white"
        // style={{ height: property_id === null ? "130px" : "300px", bottom: 0 }}
      >
        <MDBCardTitle className="text-black">{title}</MDBCardTitle>
        <MDBCardText>
          <pre className="text-black">
            {price !== null && `Price: ${price} Rs`}
            {price && <br />}
            {bedrooms !== null && `Bedrooms: ${bedrooms}-Bedrooms`}
            {bedrooms && <br />}
            {size !== null && `Size: ${size} Marla`}
            {size && <br />}
            {location !== null && `Location: ${location}`}
            {location && <br />}
            {rating !== null && `Ratings: ${rating.join("")}`}
            {rating && <br />}
            {description !== null && `Description: ${description}`}
            {description && <br />}
            {/* <>
              {currentUser !== null && (
                <>{contactInfo !== null && `Contact Info: ${contactInfo}`}</>
              )}
              {contactInfo && <br />}
            </> */}
          </pre>
        </MDBCardText>

        <div style={{ zIndex: 1 }} className="d-flex bg-white">
          {/* {currentUser === null && (
            <IconButton onClick={() => calIconNav()} title='Delete'>
              <CallIcon sx={{color: 'green'}} />
            </IconButton>
          )} */}
          {isApproved !== undefined && (
            <>
              <IconButton
                onClick={() => handleDeleteReq(agency_id)}
                title="Delete"
              >
                <ClearIcon sx={{ color: "green" }} />
              </IconButton>
              <IconButton
                onClick={() => handleApproveAgency(agency_id)}
                title="Approve"
              >
                <CheckIcon sx={{ color: "green" }} />
              </IconButton>
            </>
          )}
          {/* <Button href="#">See more</Button> */}
          {property_id !== null && (
            <IconButton
              onClick={() => {
                setFavPropertyBool(!favPropertyBool);
                if (favPropertyBool === false) {
                  handlePostFav(property_id);
                }
              }}
              sx={{ margin: "0 2rem 0 0 " }}
              title="Favorites"
            >
              <FavoriteIcon
                sx={{
                  color: favPropertyBool ? "red" : "",
                }}
              />
            </IconButton>
          )}
          {property_id !== null && currentUser !== uid && (
            <IconButton
              onClick={() => {
                if (currentUser !== undefined && currentUser !== null) {
                  handleMessage();
                } else {
                  navigate("/login");
                }
              }}
              sx={{ margin: "0 2rem 0 0 " }}
              title="Contact"
            >
              <LocalPhoneIcon sx={{ color: "green" }} />
            </IconButton>
          )}
          {currentUser === uid && editProperty !== undefined && (
            <>
              <IconButton
                onClick={handleDeleteProperty}
                sx={{ margin: "0 0 0 0 " }}
                title="Delete Property"
              >
                <DeleteOutlineIcon />
              </IconButton>

              <IconButton
                onClick={handleEdit}
                sx={{ margin: "0 2rem 0 0 " }}
                title="Edit Property"
              >
                <EditIcon />
              </IconButton>
            </>
          )}
        </div>
        <Button onClick={handleReadMore}>Read More...</Button>
        {adminId !== null &&
          is_featured === false &&
          adminId.includes(currentUser) &&
          handlePostFeature !== undefined && (
            <Button
              onClick={() => {
                handlePostFeature(property_id);
              }}
            >
              Add to features
            </Button>
          )}
        {adminId !== null &&
          is_featured === true &&
          adminId.includes(currentUser) &&
          handleRemoveFeature !== undefined && (
            <Button
              onClick={() => {
                handleRemoveFeature(property_id);
              }}
            >
              Remove from features
            </Button>
          )}
      </MDBCardBody>
    </MDBCard>
  );
};

export default CardComponent;
