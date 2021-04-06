import React, { Fragment, useContext } from "react";
import PropTypes from "prop-types";
import AuthContext from "../../context/auth/authContext";
import "../../App.css";
import { Link } from "react-router-dom";

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, logout, user } = authContext;
  return (
    <div className="navbar bg-primary">
      <h1>
        <i className={icon} /> {title}
      </h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </div>
  );
};

// Here the props are validated as Java script doesnt support implicit type check as in Type script

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: "My contacts",
  icon: "fas fa-id-card-alt",
};

export default Navbar;
