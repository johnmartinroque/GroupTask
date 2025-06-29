import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { auth, googleProvider } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

function Login() {
  const googleLogin = async () => {
    try {
      const user = await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="bg-white rounded p-4 shadow" style={{ width: "40rem" }}>
        <Row>
          <Col>
            <h1>Login</h1>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="name@example.com"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="textarea" className="form-label">
                Example textarea
              </label>
              <textarea
                className="form-control"
                id="textarea"
                placeholder="Your message..."
              />
            </div>
            <Button>Log in</Button>
          </Col>
        </Row>
        <Button onClick={googleLogin}>Login with Google</Button>
      </div>
    </div>
  );
}

export default Login;
