import { Link } from "react-router-dom";
import Clients from "../../components/Clients/Clients";
import Projects from "../../components/Projects/Projects";
import AddClient from "../AddClient/AddClient";

import "./home.css";

const Home = () => {
  return (
    <div>
      <div className="home-button-container">
        <button className="add-client-btn">
          <Link to="/addClient">Add Client</Link>
        </button>
        <button className="add-project-btn">
          <Link to="/addProject">Add Project</Link>
        </button>
      </div>
      <Projects />
      <hr />
      <AddClient />
      <hr />
      <Clients />
    </div>
  );
};

export default Home;
