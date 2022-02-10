import React from "react";
import { Container } from "react-bootstrap";
import ApolloProvider from "./ApolloProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.scss";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";

import { AuthProvider } from "./context/auth";

function App() {
  return (
    <ApolloProvider>
      <AuthProvider>
        <BrowserRouter>
          <Container className="pt-5">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </Container>
        </BrowserRouter>
        </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
