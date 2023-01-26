import { Link } from "react-router-dom";

// COMPONENTS
import Projects from "../../components/_projects_/Projects/Projects";
import Button from "../../components/Button/Button";

import "./projectsPage.css";

const rootClass = "projects-page";

const ProjectsPage = () => {

  return (
    <div className={`${rootClass}-main-container`}>
      <Link className={`${rootClass}-add-project-text`} to="/addProject">
        <Button buttonType="submit" className={`${rootClass}-add-project-btn`}>
          Add Project
        </Button>
      </Link>
      <hr />
      <Projects />
    </div>
  );
};

export default ProjectsPage;
