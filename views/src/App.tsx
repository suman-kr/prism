import React from "react";
import { Login } from "./components/User/Login";
import { Router } from "@reach/router";
import { Home } from "./components/Home";
import { Signup } from "./components/User/SignUp";

function App() {
  return (
    <Router>
      <Home path="/" />
      <Login path="login/" />
      <Signup path="signup/" />
    </Router>
  );
}

export default App;
