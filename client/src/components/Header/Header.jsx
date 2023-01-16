import { Link } from "react-router-dom";

import "./header.css";

const Header = () => {
  return (
    <div className="nav-bar">
      <Link to="/">
        <h2 className="header-title">D Y N A</h2>
      </Link>

      <div className="header-links-container">
        <Link to="/projects">
          <h2 className="header-link">Projects</h2>
        </Link>

        <Link to="/clients">
          <h2 className="header-link">Clients</h2>
        </Link>

        <Link to="/dashboard">
          <h2 className="header-link">Dashboard</h2>
        </Link>

        <Link to="/projects/:id/kanban">
          <h2 className="header-link">Kanban</h2>
        </Link>
      </div>
    </div>
  );
};

export default Header;
