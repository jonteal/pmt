import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import Clients from "../../components/_clients_/Clients/Clients";
import Projects from  "../../components/_projects_/Projects/Projects";

import "./home.css";

const Home = () => {

  return (
    <div className="home-main-container">
      <div className="home-button-container">
        <Button buttonType='submit' className="add-client-btn">
          <Link className="add-client-link" to="/addClient">Add Client</Link>
        </Button>
        <Button buttonType='submit' className="add-project-btn">
          <Link className="add-project-link" to="/addProject">Add Project</Link>
        </Button>
      </div>

      <Projects />

      <hr />
      
      <Clients />
    </div>
  );
};

export default Home;
