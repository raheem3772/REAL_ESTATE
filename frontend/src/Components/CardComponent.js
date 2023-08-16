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
}) => {
  const [favPropertyBool, setFavPropertyBool] = useState(false);
  useEffect(() => {
    if (property_id === fav_id) {
      setFavPropertyBool(true);
    } else if (property_id === fav_id) {
      setFavPropertyBool(true);
    }
  }, []);
  return (
    <MDBCard>
      <MDBRipple
        rippleColor="light"
        rippleTag="div"
        className="bg-image hover-overlay"
      >
        <MDBCardImage
          src="https://mdbootstrap.com/img/new/standard/nature/111.webp"
          fluid
          alt="..."
          
        />
        <a>
          <div
            className="mask"
            style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
          ></div>
        </a>
      </MDBRipple>
      <MDBCardBody>
        <MDBCardTitle>{title}</MDBCardTitle>
        <MDBCardText>
          <pre>
            {price !== null && `Price: ${price}$`}
            {price && <br />}
            {bedrooms !== null && `Bedrooms: ${bedrooms}-Bedrooms`}
            {bedrooms && <br />}
            {size !== null && `Size: ${size} sq/ft`}
            {size && <br />}
            {location !== null && `Location: ${location}`}
            {location && <br />}
            {rating !== null && `Ratings: ${rating.join("")}`}
            {rating && <br />}
            {description !== null && `Location: ${description}`}
            {description && <br />}
            {/* <span
                        style={{ fontSize: "1.2rem" }}
                        className="text-warning"
                      >
                        {" "}
                        {val.rating}
                        ★★★
                      </span> */}
          </pre>
        </MDBCardText>
        <div className="d-flex">
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
          {currentUser !== null && property_id !== null && (
            <IconButton
              onClick={handleMessage}
              sx={{ margin: "0 2rem 0 0 " }}
              title="Message"
            >
              <MailOutlineIcon sx={{ color: "green" }} />
            </IconButton>
          )}
        </div>
      </MDBCardBody>
    </MDBCard>
  );
};

export default CardComponent;
