import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { auth, googleProvider } from "../../firebase";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate("");
  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("Google login user email:", user.email);
      localStorage.setItem("userEmail", user.email);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const userLogin = async () => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;
      console.log("Logged in user email: ", user.email);
      localStorage.setItem("userEmail", user.email);
      console.log(user.email);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const logoutUser = async () => {
    try {
      signOut(auth);
      localStorage.removeItem("userEmail");
      navigate("/");
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="form-control"
                placeholder="name@example.com"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="textarea" className="form-label">
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder="Your message..."
                type="password"
              />
            </div>
            <Button onClick={userLogin}>Log in</Button>
          </Col>
        </Row>
        <Button onClick={googleLogin}>Login with Google</Button>
      </div>
    </div>
  );
}

export default Login;
