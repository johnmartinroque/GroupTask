import { signOut } from "firebase/auth";
import React, { use, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";

function Header() {
  const [userEmail, setUserEmail] = useState("");
  const user = localStorage.getItem("userEmail");
  const navigate = useNavigate("");

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("userEmail");
      setUserEmail(null);
      navigate("/landing");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("userEmail");
    if (storedUser) {
      setUserEmail(storedUser);
    }
  }, []);

  return (
    <div>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <Link to="/" as={Link} class="navbar-brand">
            Navbar
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link
                  to="/"
                  as={Link}
                  class="nav-link active"
                  aria-current="page"
                  href="#"
                >
                  Home
                </Link>
              </li>
              {!user && (
                <li className="nav-item">
                  <a className="nav-link" href="/login">
                    Login
                  </a>
                </li>
              )}

              {user && (
                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {user}
                  </a>
                  <ul class="dropdown-menu">
                    <li>
                      <Link class="dropdown-item" to={"/profile"}>
                        Profile
                      </Link>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        Another action
                      </a>
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
            <form class="d-flex" role="search">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button class="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
