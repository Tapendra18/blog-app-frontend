import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import { Helmet } from "react-helmet";

const UserBlog = () => {
  const [blogs, setBlogs] = useState([]);

  //get user blogs
  const getuserBlogs = async () => {
    try {
      const id = localStorage.getItem("userId");
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/blog/user-blog/${id}`
      );
      if (data?.success) {
        setBlogs(data?.userBlog.blog);
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log(blogs, "userrr blog");
  useEffect(() => {
    getuserBlogs();
  }, []);
  console.log(blogs);
  return (
    <div>
      <Helmet>
        <title>Blogs</title>
        <meta
          name="keywords"
          content="create Post for tech and other category"
        />
      </Helmet>
      {blogs &&
        blogs.map((blog) => (
          <BlogCard
            _id={blog._id}
            isUser={true}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            username={blog.username}
            time={blog.createdAt}
          />
        ))}
    </div>
  );
};

export default UserBlog;
