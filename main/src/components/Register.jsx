import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase";
import { Button, Col, Row } from "react-bootstrap";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const registerUser = async () => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = result.user;
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error(err);
      if (err.message == "Firebase: Error (auth/email-already-in-use).") {
        setErrorMessage("Email already in use");
      }
    }
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="bg-white rounded p-4 shadow" style={{ width: "40rem" }}>
        <Row>
          <Col>
            <h1>Register</h1>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="textarea" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button onClick={registerUser}>Register</Button>
            {errorMessage && <p className="text-danger mt-2">{errorMessage}</p>}
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Register;
