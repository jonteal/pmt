import Projects from "../../components/_projects_/Projects/Projects";
import { Link } from "react-router-dom";

import './projectsPage.css';
import Button from "../../components/Button/Button";

const ProjectsPage = () => {
  return (
    <div className="projects-page-main-container">
      <Button buttonType='submit' className="projects-page-add-project-btn">
        <Link className="projects-page-add-project-text" to="/addProject">Add Project</Link>
      </Button>
      <Projects />
    </div>
  );
};

export default ProjectsPage;
