import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase";
import { Button, Col, Row } from "react-bootstrap";

function Register() {
  const [name, setName] = useState(""); // 👈 name input
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

      // 👇 Update displayName in Firebase Auth
      await updateProfile(user, {
        displayName: name,
      });

      setEmail("");
      setPassword("");
      setName("");
      setErrorMessage("Registered");
    } catch (err) {
      console.error(err);
      if (err.message === "Firebase: Error (auth/email-already-in-use).") {
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
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
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
