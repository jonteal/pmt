import Projects from "../../components/_projects_/Projects/Projects";
import { Link } from "react-router-dom";

import './projectsPage.css';

const ProjectsPage = () => {
  return (
    <div className="projects-page-main-container">
      <button className="projects-page-add-project-btn">
        <Link to="/addProject">Add Project</Link>
      </button>
      <Projects />
    </div>
  );
};

export default ProjectsPage;
