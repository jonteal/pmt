import { useState } from "react";

import { Link } from "react-router-dom";

const Dropdown = ({ type }) => {

  return (
    <div className="dropdown">
      <button
        className="dropdown-toggle dropdown"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
      </button>
      <ul className="dropdown-menu">
        <li>
          {/* <Link onClick={} className="dropdown-item" to="/">
            Delete Project
  </Link>*/}
        </li>
      </ul>
    </div>
  );
};

export default Dropdown;
