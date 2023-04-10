import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Blogs from "./pages/Blogs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserBlog from "./pages/UserBlog";
import DetailsPage from "./pages/DetailsPage";
import CreateBlog from "./pages/CreateBlog";
import UpdateandDelete from "./pages/UpdateandDelete";
import { Helmet } from "react-helmet";

function App() {
  return (
    <>
      <Header />
      <Helmet>
        <title>Blog App</title>
        <meta name="description" content="this is blog website " />
        <meta
          name="keywords"
          content="create Post for tech and other category"
        />
        <style type="text/css">
          {`.app{
              background-color:#39445a
            }`}
        </style>
      </Helmet>
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/my-blogs" element={<UserBlog />} />
        <Route path="/view/:id" element={<DetailsPage />} />
        {/* <Route path="/updatedelete/:id" element={<UpdateandDelete />} /> */}
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/updatedelete" element={<UpdateandDelete />} />
      </Routes>
    </>
  );
}

export default App;
