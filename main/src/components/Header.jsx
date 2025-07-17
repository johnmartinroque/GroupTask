import { signOut, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import "../src_css/components/Header.css";

function Header() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/landing");
      alert("Successfully logged out");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" id="nav">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          LiamWayne
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link active" aria-current="page">
                Home
              </Link>
            </li>

            {!user && (
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
            )}

            {user && (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {user.displayName || user.email}
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            )}
          </ul>

          <form className="search-form d-flex" role="search">
            <input
              className="form-control me-2 search-input"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success bi bi-search" type="submit"></button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Header;
