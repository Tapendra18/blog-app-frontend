import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";

const Register = () => {
  const navigate = useNavigate();

  //state
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  //handle change
  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //handlesubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/user/register", {
        username: input.username,
        email: input.email,
        password: input.password,
      });
      if (data.success) {
        alert("User Register successfully");
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Helmet>
        <title>Register</title>
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
            // maxWidth: "450px",
          }}
        >
          <Typography
            variant="h4"
            sx={{ textTransform: "uppercase" }}
            padding={3}
            textAlign="center"
          >
            Register
          </Typography>
          <TextField
            placeholder="username"
            value={input.username}
            onChange={handleChange}
            name="username"
            margin="normal"
            type={"text"}
            required
          />
          <TextField
            value={input.email}
            placeholder="email"
            onChange={handleChange}
            name="email"
            margin="normal"
            type={"text"}
            required
          />
          <TextField
            placeholder="password"
            value={input.password}
            onChange={handleChange}
            name="password"
            margin="normal"
            type={"text"}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Submit
          </Button>
          <Button
            onClick={() => navigate("/login")}
            type="submit"
            color="primary"
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Already Registerd ? Please Login
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Register;
