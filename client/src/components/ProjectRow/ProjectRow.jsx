// ROUTING
import { Link } from "react-router-dom";

// GRAPHQL
import { useMutation } from "@apollo/client";
import { DELETE_PROJECT } from "../../graphql/mutations/projectMutations";
import { GET_PROJECTS } from "../../graphql/queries/projectQueries";
import { GET_CLIENTS } from "../../graphql/queries/clientQueries";

import "./projectRow.css";

const ProjectRow = ({ project }) => {
  const clientName = project.client.firstName + " " + project.client.lastName;

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: project.id },
    refetchQueries: [
      { query: GET_CLIENTS },
      {
        query: GET_PROJECTS,
      },
    ],
  });

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
        <div className="dropdown project-dropdown">
          <button
            className="dropdown-toggle dropdown"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          ></button>
          <ul className="dropdown-menu">
            <li>
              <Link onClick={deleteProject} className="dropdown-item" to="/">
                Delete Project
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default ProjectRow;
