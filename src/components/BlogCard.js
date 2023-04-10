import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import axios from "axios";
import { Helmet } from "react-helmet";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function BlogCard({
  title,
  description,
  image,
  username,
  time,
  _id,
  isUser,
  categories,
}) {
  let navigate = useNavigate();
  const viewReport = async (e, id) => {
    navigate(`/view/${id}`);
  };

  const API_URL = "http://localhost:8000/";

  return (
    <>
      <Helmet>
        <title>All Blog page</title>
        <meta
          name="keywords"
          content="create Post for tech and other category"
        />
      </Helmet>
      <Grid item container lg={4}>
        <Card
          sx={{
            boxShadow: "5px 5px 10px #ccc",
            ":hover:": {
              boxShadow: "10px 10px 20px #ccc",
            },
          }}
        >
          <CardHeader
            title={title}
            subheader={time}
            sx={{ cursor: "pointer" }}
            onClick={(e) => viewReport(e, `${_id}`)}
          />
          <CardHeader
            sx={{ cursor: "pointer", fontSize: "5px" }}
            title={categories}
          />
          <img
            height="217px"
            width="426px"
            src={`http://localhost:8000/${image}`}
            alt="blog image"
          />

          <CardContent>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ cursor: "pointer" }}
            >
              {description}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}
