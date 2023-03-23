import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <div className="header-container">
      <div className="link-app">
        <Link to="/list" className="page">
          ListPage
        </Link>
        <Link to="/singleuser" className="page">
          SingleUserPage
        </Link>
        <Link to="/adduser" className="page">
          AddUser
        </Link>
      </div>
    </div>
  );
};

export default Header;
