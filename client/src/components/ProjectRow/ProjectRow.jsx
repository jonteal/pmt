// ROUTING
import { Link } from "react-router-dom";

// GRAPHQL
import { useMutation } from "@apollo/client";
import { DELETE_PROJECT } from "../../graphql/mutations/projectMutations";
import { GET_PROJECTS } from "../../graphql/queries/projectQueries";
import { GET_CLIENTS } from "../../graphql/queries/clientQueries";

// COMPONENTS
import Dropdown from "../Dropdown/Dropdown";

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
        <div className="project-row-options">
          <Dropdown deleteProject={deleteProject} />
        </div>
      </div>
    </>
  );
};

export default ProjectRow;
