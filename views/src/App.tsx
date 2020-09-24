import React from "react";
import { Login } from "./components/User/Login";
import { Router, Redirect } from "@reach/router";
import { Home } from "./components/Home";
import { Signup } from "./components/User/SignUp";
import { EmailVerify } from "./components/User/EmailVerify";

function App() {
  return (
    <>
      <Router>
        <Home path="/" />
        <Login path="login/" />
        <Signup path="signup/" />
        <EmailVerify path="verify/" />
      </Router>
    </>
  );
}

export default App;
