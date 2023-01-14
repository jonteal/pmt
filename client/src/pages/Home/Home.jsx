import { Link } from "react-router-dom";
import Clients from "../../components/_clients_/Clients/Clients";
import Projects from  "../../components/_projects_/Projects/Projects";

import "./home.css";

const Home = () => {

  return (
    <div className="home-main-container">
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
      
      <Clients />
    </div>
  );
};

export default Home;
