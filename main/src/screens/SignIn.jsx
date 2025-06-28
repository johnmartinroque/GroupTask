import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { auth, googleProvider } from "../firebase";
import Register from "../components/Register";

function SignIn() {
  const register = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log("User signed in:", user);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData?.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.error("Sign-in error:", errorCode, errorMessage);
    }
  };

  return (
    <div>
      <Row>
        <Col>
          <Register />
        </Col>
      </Row>
      <Row>
        <Col>
          <button onClick={register}>Register</button>
        </Col>
      </Row>
    </div>
  );
}

export default SignIn;
