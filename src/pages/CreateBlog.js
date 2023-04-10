import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const CreateBlog = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
  });
  const [file, setFile] = useState();
  let navigate = useNavigate();

  const handleChange = (e) => {
    setInput((preState) => ({
      ...preState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImage = (e) => {
    console.log(e.target.files);
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", input.title);
    formData.append("description", input.description);
    formData.append("categories", input.categories);
    console.log(formData, "formmmdataa");
    try {
      const data = await axios.post(
        "http://localhost:8000/api/v1/blog/create-blog",
        formData,
        {
          title: input.title,
          description: input.description,
          image: input.image,
          categories: input.categories,
        }
      );
      navigate("/blogs");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Helmet>
        <title>Create Blog</title>
        <meta
          name="keywords"
          content="create Post for tech and other category"
        />
      </Helmet>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={450}
          display="flex"
          sx={{
            flexDirection: "column",
            boxShadow: "10px 10px 20px #ccc",
            alignItems: "center",
            justifyContent: "center",
            margin: "auto",
            marginTop: "50px",
            padding: "3px",
            borderRadius: "5px",
          }}
        >
          <Typography
            variant="h4"
            sx={{ textTransform: "uppercase" }}
            padding={3}
            textAlign="center"
          >
            Create-Blog
          </Typography>

          <TextField
            onChange={handleChange}
            value={input.title}
            placeholder="title"
            name="title"
            type={"text"}
          />
          <TextField
            onChange={handleChange}
            value={input.description}
            placeholder="description"
            name="description"
            type={"text"}
          />
          <TextField
            onChange={handleImage}
            value={input.image}
            placeholder="image"
            name="image"
            type={"file"}
          />
          <TextField
            onChange={handleChange}
            value={input.categories}
            placeholder="categories"
            name="categories"
            type={"text"}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Submit
          </Button>
        </Box>
      </form>
    </>
  );
};

export default CreateBlog;
