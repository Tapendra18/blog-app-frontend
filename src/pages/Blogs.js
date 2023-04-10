import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import { Grid } from "@mui/material";
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
  const API_URL = "http://localhost:8000/";

  // const url = blogs.image
  //   ? blogs.image
  //   : "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80 ";

  useEffect(() => {
    getAllBlogs();
  }, []);
  console.log(blogs, "blogggggg");
  return (
    <div>
      <Helmet>
        <title>Blog </title>
        <meta
          name="keywords"
          content="create Post for tech and other category"
        />
      </Helmet>
      <Grid item container>
        <Grid item container spacing={2}>
          {blogs && blogs.length > 0 ? (
            blogs.map((blog) => (
              <BlogCard
                title={blog.title}
                // isUser={localStorage.getItem("userId") === blog.user.id}
                description={blog.description}
                image={blog.image}
                username={blog.username}
                time={blog.createdAt}
                _id={blog._id}
                categories={blog.categories}
              />
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
