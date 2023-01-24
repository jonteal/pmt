import { Link } from "react-router-dom";

import "./header.css";

const Header = () => {
  const rootClass = 'header';

  return (
    <div className="nav-bar">
      <Link to="/">
        <h2 className={`${rootClass}-title`}>D Y N A</h2>
      </Link>

      <div className={`${rootClass}-links-container`}>
        <Link to="/projects">
          <h2 className={`${rootClass}-link`}>Projects</h2>
        </Link>

        <Link to="/clients">
          <h2 className={`${rootClass}-link`}>Clients</h2>
        </Link>

        <Link to="/dashboard">
          <h2 className={`${rootClass}-link`}>Dashboard</h2>
        </Link>

        <Link to="/projects/:id/kanban">
          <h2 className={`${rootClass}-link`}>Kanban</h2>
        </Link>
      </div>
    </div>
  );
};

export default Header;
