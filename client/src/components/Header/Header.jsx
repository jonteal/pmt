import React from "react";
import { Link } from "react-router-dom";

import "./header.css";

const Header = () => {
  return (
    <div className="nav-bar">
      <Link to="/">
        <h2 className="header-title">Project Manager</h2>
      </Link>
    </div>
  );
};

export default Header;
