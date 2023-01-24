import { Link } from "react-router-dom";

// COMPONENTS
import Projects from "../../components/_projects_/Projects/Projects";
import Button from "../../components/Button/Button";

import "./projectsPage.css";

const ProjectsPage = () => {
  const rootClass = "projects-page";

  return (
    <div className={`${rootClass}-main-container`}>
      <Button buttonType="submit" className={`${rootClass}-add-project-btn`}>
        <Link className={`${rootClass}-add-project-text`} to="/addProject">
          Add Project
        </Link>
      </Button>
      <Projects />
    </div>
  );
};

export default ProjectsPage;
