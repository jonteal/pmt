import Dropdown from "../Dropdown/Dropdown";
import "./projectRow.css";

const ProjectRow = ({ project }) => {
  console.log(project.id);

  const clientName = project.client.firstName + " " + project.client.lastName;

  console.log(project);
  
  return (
    <>
      <a href={`/projects/${project.id}`}>
        <div className="project-row-container">
          <div className="project-title">
            <h3>{project.title}</h3>
          </div>
          <div className="project-status">
            <p>{project.status}</p>
          </div>
          <div className="project-deadline">
            <p>Deadline</p>
          </div>
          <div className="project-client-name">
            <a href={`/clients/${project.client.id}`}>{clientName}</a>
          </div>
          <div className="project-row-options">
            <Dropdown />
          </div>
        </div>
      </a>
    </>
  );
};

export default ProjectRow;
