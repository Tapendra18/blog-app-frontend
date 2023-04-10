import React, { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import { Helmet } from "react-helmet";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //global state
  const isLogin = useSelector((state) => state.isLogin);
  console.log(isLogin, "reduxxxxxxx");
  //state
  const [value, setValue] = useState();
  const adminEmail = "text12@gmail.com";
  const email = localStorage.getItem("Email");
  //logout
  const handleLogout = () => {
    try {
      dispatch(authActions.logout());
      alert("logout successfully");
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Helmet>
        <title>Home page</title>
        <meta
          name="keywords"
          content="create Post for tech and other category"
        />
      </Helmet>
      <AppBar position="sticky" sx={{ display: "-webkit-inline-box" }}>
        <Toolbar>
          <Tab
            LinkComponent={Link}
            to="/"
            sx={{ cursor: "pointer" }}
            label="Blog App"
          ></Tab>
          {isLogin && (
            <Box display={"flex"} marginLeft="auto" marginRight={"auto"}>
              <Tabs
                textColor="inherit"
                value={value}
                onChange={(e, val) => setValue(val)}
              >
                <Tab label="Blogs" LinkComponent={Link} to="/blogs" />
                {/* <Tab label="My Blogs" LinkComponent={Link} to="/my-blogs" /> */}
                {adminEmail === email && (
                  <Tabs>
                    <Tab
                      label="Create Blog"
                      LinkComponent={Link}
                      to="/create-blog"
                    />
                    <Tab
                      label="Edit and Delete"
                      LinkComponent={Link}
                      to="/updatedelete"
                    />
                  </Tabs>
                )}
              </Tabs>
            </Box>
          )}
        </Toolbar>
        <Box display={"flex"} marginLeft="auto">
          {!isLogin && (
            <>
              <Button
                sx={{ margin: 1, color: "white" }}
                LinkComponent={Link}
                to="/login"
              >
                Login
              </Button>
              <Button
                sx={{ margin: 1, color: "white" }}
                LinkComponent={Link}
                to="/register"
              >
                Register
              </Button>
            </>
          )}
          {isLogin && (
            <Button sx={{ margin: 1, color: "white" }} onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Box>
      </AppBar>
    </>
  );
};

export default Header;
