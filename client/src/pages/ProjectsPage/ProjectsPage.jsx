import { Link } from "react-router-dom";

// COMPONENTS
import Projects from "../../components/_projects_/Projects/Projects";
import Button from "../../components/Button/Button";

import "./projectsPage.css";

const ProjectsPage = () => {
  return (
    <div className="projects-page-main-container">
      <Button buttonType="submit" className="projects-page-add-project-btn">
        <Link className="projects-page-add-project-text" to="/addProject">
          Add Project
        </Link>
      </Button>
      <Projects />
    </div>
  );
};

export default ProjectsPage;
