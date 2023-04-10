import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import { Grid, Card, CardHeader, CardContent, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Helmet } from "react-helmet";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/v1/blog/all-blog"
      );
      if (data?.success) {
        setBlogs(data.blogs);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const HandleDelete = async (id) => {
    const { data } = await axios.delete(
      `http://localhost:8000/api/v1/blog/delete-blog/${id}`
    );
    alert("delete");
  };
  // const url = blogs.image
  //   ? blogs.image
  //   : "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80 ";

  useEffect(() => {
    getAllBlogs();
  }, []);
  console.log(blogs, "update");
  return (
    <div>
      <Helmet>
        <title>Update And Delete</title>
        <meta
          name="keywords"
          content="create Post for tech and other category"
        />
      </Helmet>
      <Grid
        item
        container
        lg={4}
        sx={{ marginLeft: "20px", marginTop: "30px" }}
      >
        <Grid item container spacing={2}>
          {blogs && blogs.length > 0 ? (
            blogs.map((blog) => (
              <Card
                sx={{
                  boxShadow: "5px 5px 10px #ccc",
                  ":hover:": {
                    boxShadow: "10px 10px 20px #ccc",
                  },
                }}
              >
                <EditIcon sx={{ cursor: "pointer" }} />
                <DeleteIcon
                  sx={{ cursor: "pointer" }}
                  onClick={(e) => HandleDelete(e)}
                />
                <CardHeader
                  title={blog.title}
                  subheader={blog.time}
                  sx={{ cursor: "pointer" }}
                  // onClick={(e) => viewReport(e, `${_id}`)}
                />
                <CardHeader
                  sx={{ cursor: "pointer", fontSize: "5px" }}
                  title={blog.categories}
                />
                <img
                  height="217px"
                  width="426px"
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
            ))
          ) : (
            <div style={{ marginTop: "50px", marginLeft: "20px" }}>
              NO data available
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Blogs;
