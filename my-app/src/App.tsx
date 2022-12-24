import React from "react";
import logo from "./logo.svg";
import "./App.css";
import LoginPage from "./components/auth/login";
import HomePage from "./components/home";
import RegisterPage from "./components/auth/register";
import { Route, Routes } from "react-router-dom";
import NoMatchPage from "./components/noMatch";
import DefaultLayout from "./components/containers/default";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout/>}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="*" element={<NoMatchPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
