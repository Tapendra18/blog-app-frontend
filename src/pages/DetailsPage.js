import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Card,
  Grid,
  CardHeader,
  Typography,
  CardMedia,
  CardContent,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { Helmet } from "react-helmet";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";

const DetailsPage = () => {
  const [blog, setBlog] = useState({});
  const [comments, setComment] = useState([]);
  const id = useParams().id;

  const [input, setInput] = useState({
    title: "",
  });
  //get blog datails ;
  const getBlogDetails = async () => {
    try {
      const { data } = await axios.get(
        `http://127.0.0.1:8000/api/v1/blog/get-blog/${id}`
      );
      if (data?.success) {
        setBlog(data?.blog);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getcomment = async () => {
    try {
      await axios
        .get("http://127.0.0.1:8000/api/v1/comment/all-comment")
        .then((response) => setComment(response.data.comment))
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // const handleDelete = async (id) => {
  //   await axios
  //     .delete(`/api/v1/blog/delete-blog/:id`)
  //     .then((response) => console.log(response));
  // };

  // const handleEdit = async () => {
  //   await axios
  //     .put(`/api/v1/blog/update-blog/:id`)
  //     .then((response) => console.log(response));
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://127.0.0.1:8000/api/v1/comment/create-comment",
        {
          title: input.title,
        }
      );
      if (data.success) {
        alert("comment successfully");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const url = blog.image
    ? blog.image
    : "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80 ";

  useEffect(() => {
    getBlogDetails();
  }, [id]);

  useEffect(() => {
    getcomment();
  }, []);

  //   const location = useLocation();
  //   useEffect(() => {
  //     const id = location.pathname.split("/view/")[1];
  //     console.log(id);
  //     if(id){
  //       viewReport(id);
  //     }
  //   }, [location]);
  return (
    <div>
      <Helmet>
        <title>{blog.title}</title>
        <meta name="keywords" content={blog.description} />
      </Helmet>
      <Grid>
        <Card
          sx={{
            boxShadow: "5px 5px 10px #ccc",
            ":hover:": {
              boxShadow: "10px 10px 20px #ccc",
            },
          }}
        >
          <CardHeader
            title={blog.title}
            subheader={blog.time}
            sx={{ cursor: "pointer" }}
          />
          {/* <CardMedia
            component="img"
            height="194"
            image={blog.image}
            alt="Paella dish"
          /> */}
          <img
            height="350px"
            width="100%"
            src={`http://localhost:8000/${blog.image}`}
            alt="blog image"
          />
          <CardContent>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ cursor: "pointer" }}
            >
              {blog.description}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      {comments?.map((data, index) => {
        return (
          <div key={index}>
            <Card
              sx={{
                marginTop: "15px",
                width: "50%",
                margin: "auto",
                height: "30px",
              }}
            >
              {data.title}
            </Card>
          </div>
        );
      })}
      <form onSubmit={handleSubmit}>
        <TextField
          onChange={handleChange}
          value={input.title}
          placeholder="comment"
          type={"text"}
          name="title"
          sx={{
            width: "70%",
            marginLeft: "150px",
            marginTop: "10px",
          }}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            marginTop: "28px",
            marginLeft: "5px",
          }}
        >
          Send
        </Button>
      </form>
    </div>
  );
};

export default DetailsPage;
