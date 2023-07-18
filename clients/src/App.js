import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Helmet } from "react-helmet";
import { Container } from "@mui/material";

import NavBar from "./components/Navbar/NavBar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";
import { useSelector } from "react-redux";

const App = () => {
  const loginUser = useSelector((state) => state.profile);
  return (
    <>
      <Helmet>
        <meta
          http-equiv="Cross-Origin-Opener-Policy"
          content="same-origin-allow-popups"
        />
      </Helmet>
      <Router>
        <Container style={{ marginBottom: "150px" }} maxWidth="xl">
          <NavBar />
          <Routes>
            <Route path="/" exact element={<Navigate to={"/posts"} />} />
            <Route path="/posts" exact element={<Home />} />
            <Route path="/posts/search" exact element={<Home />} />
            <Route path="/posts/:id" exact element={<PostDetails />} />
            <Route
              path="/auth"
              element={loginUser ? <Auth /> : <Navigate to="/posts" replace />}
            />
          </Routes>
        </Container>
      </Router>
    </>
  );
};

export default App;
