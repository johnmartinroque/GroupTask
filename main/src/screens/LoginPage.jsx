import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { auth, googleProvider } from "../firebase";
import Register from "../components/Register";
import Login from "../components/Login";

function LoginPage() {
  return (
    <div>
      <Login />
      <Register />
    </div>
  );
}

export default LoginPage;
