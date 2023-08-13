import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Pic from "../assets/Dash1.png";
import axios from "axios";
import { BASE_URL } from "../BaseApiUrl";
export default function CardComp({ title, price, location }) {
  const [expanded, setExpanded] = React.useState(false);
  const [favButton, setFavButton] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card elevation={12} sx={{ maxWidth: 345 }}>
      <div>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          title="Faizan Mukhtar"
          subheader="August 08, 2023"
        />{" "}
        {/* <CardMedia component="img" height="194" image={Pic} alt="Paella dish" /> */}
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {location}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            aria-label="add to favorites"
            onClick={() => setFavButton(!favButton)}
          >
            <FavoriteIcon color={favButton ? "error" : ""} />
          </IconButton>
        </CardActions>
      </div>
    </Card>
  );
}
