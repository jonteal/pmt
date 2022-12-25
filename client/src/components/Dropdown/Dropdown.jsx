
const Dropdown = () => {
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
          <a className="dropdown-item" href="/">
            Delete Project
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Dropdown;
