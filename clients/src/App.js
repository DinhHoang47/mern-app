import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Container } from "@mui/material";

import NavBar from "./components/Navbar/NavBar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";

const App = () => {
  return (
    <>
      <Helmet>
        <meta
          http-equiv="Cross-Origin-Opener-Policy"
          content="same-origin-allow-popups"
        />
      </Helmet>
      <Router>
        <Container style={{ marginBottom: "150px" }} maxWidth="lg">
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </Container>
      </Router>
    </>
  );
};

export default App;
