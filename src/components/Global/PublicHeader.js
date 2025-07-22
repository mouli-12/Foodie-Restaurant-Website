import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography
} from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./PublicHeader.css";

// simple JWT parser (as before)
function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    const decoded = JSON.parse(jsonPayload);
    const now = Date.now() / 1000;
    if (decoded.exp && decoded.exp < now) return null;
    return decoded;
  } catch {
    return null;
  }
}

export default function PublicHeader() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const t = localStorage.getItem("jwtToken");
    const decoded = t && parseJwt(t);
    if (decoded) {
      setIsLoggedIn(false);
      setUserRole(decoded.userRole);
      setUserName(decoded.userName || decoded.username || decoded.email || "User");
    } else {
      localStorage.removeItem("jwtToken");
      setIsLoggedIn(false);
      setUserRole(null);
      setUserName("");
    }
  }, [location]);

  console.log(isLoggedIn,"isLog")

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    setIsLoggedIn(false);
    setUserRole(null);
    navigate("/");
  };

  const isHome = location.pathname === "/";
  const isUserPage = location.pathname === "/user-page";

  return (
    <AppBar position="static" className={isHome ? "header-large" : "header-small"}>
      <Toolbar className="public-toolbar">
        <Typography
          variant="h4"
          component={Link}
          to="/"
          className="foodie-title"
        >
          Foodie
        </Typography>

        <Box className="nav-links">
          {/* — PUBLIC NAV (unchanged) — */}
          {!isLoggedIn && (
            <>
              <Button component={Link} to="/about" className="nav-btn">
                About Us
              </Button>
              <Button component={Link} to="/contact" className="nav-btn">
                Contact Us
              </Button>
              {!["/signup"].includes(location.pathname) && (
                <Button component={Link} to="/signup" className="nav-btn">
                  Sign Up
                </Button>
              )}
              {!["/login"].includes(location.pathname) && (
                <Button component={Link} to="/login" className="nav-btn">
                  Login
                </Button>
              )}
            </>
          )}

          {/* — USER NAV (new order) — */}
          {isLoggedIn && userRole === "user" && (
            <>
              <Button component={Link} to="/cart" className="nav-btn">
                Cart
              </Button>
              <Button component={Link} to="/orders" className="nav-btn">
                Order History
              </Button>
              <Button component={Link} to="/about" className="nav-btn">
                About Us
              </Button>
              <Button component={Link} to="/contact" className="nav-btn">
                Contact Us
              </Button>
              <Typography variant="body1" className="nav-btn user-name">
                Hi, {userName}
              </Typography>
              <Button onClick={handleLogout} className="nav-btn">
                Logout
              </Button>
            </>
          )}

          {/* — OWNER NAV (About → Contact → Name → Logout) — */}
          {isLoggedIn && userRole === "owner" && (
            <>
              <Button component={Link} to="/about" className="nav-btn">
                About Us
              </Button>
              <Button component={Link} to="/contact" className="nav-btn">
                Contact Us
              </Button>
              <Typography variant="body1" className="nav-btn user-name">
                Hi, {userName}
              </Typography>
              <Button onClick={handleLogout} className="nav-btn">
                Logout
              </Button>
            </>
          )}
        </Box>
      </Toolbar>

      {/* — TAGLINE — */}
      {(!isLoggedIn && isHome) && (
        <div className="header-content">
          <Box className="header-center-text">
            <Typography variant="h3" className="header-text">
              Are You a Foodie? Order Now and Satisfy Your Hunger!
            </Typography>
          </Box>
        </div>
      )}

      {(isLoggedIn && isUserPage) && (
        <div className="header-content">
          <Box className="header-center-text">
            <Typography variant="h3" className="header-text">
              Welcome, Foodie
            </Typography>
          </Box>
        </div>
      )}
    </AppBar>
  );
}
