import { Link } from "react-router-dom";
import Dropdown from "../Dropdown/Dropdown";
import "./projectRow.css";

const ProjectRow = ({ project }) => {
  const clientName = project.client.firstName + " " + project.client.lastName;

  console.log(project);

  return (
    <>
      <div className="project-row-container">
        <div className="project-title">
          <Link to={`/projects/${project.id}`}>
            <h3>{project.title}</h3>
          </Link>
        </div>
        <div className="project-status">
          <p>{project.status}</p>
        </div>
        <div className="project-deadline">
          <p>Deadline</p>
        </div>
        <div className="project-client-name">
          <Link to={`/clients/${project.client.id}`}>{clientName}</Link>
        </div>
        <div className="project-row-options">
          <Dropdown />
        </div>
      </div>
    </>
  );
};

export default ProjectRow;
