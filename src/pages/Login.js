import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import { Helmet } from "react-helmet";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //state
  const [input, setInput] = useState({
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
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        {
          email: input.email,
          password: input.password,
        }
      );
      if (data.success) {
        localStorage.setItem("Email", data?.user.email);
        dispatch(authActions.login());
        alert("User login successfully");
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Helmet>
        <title>Login</title>
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
            Login
          </Typography>
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
            onClick={() => navigate("/register")}
            type="submit"
            color="primary"
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Not a user ? Please Register
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Login;
