import { Link } from "react-router-dom";

// COMPONENTS
import Button from "../../components/Button/Button";
import Clients from "../../components/_clients_/Clients/Clients";
import Projects from "../../components/_projects_/Projects/Projects";

import "./home.css";

const Home = () => {
  return (
    <div className="home-main-container">
      <div className="home-button-container">
        <Link className="add-client-link" to="/addClient">
          <Button buttonType="submit" className="add-client-btn">
            Add Client
          </Button>
        </Link>
        <Link className="add-project-link" to="/addProject">
          <Button buttonType="submit" className="add-project-btn">
            Add Project
          </Button>
        </Link>
      </div>

      <Projects />

      <hr />

      <Clients />
    </div>
  );
};

export default Home;
