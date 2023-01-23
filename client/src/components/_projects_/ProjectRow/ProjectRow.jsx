// ROUTING
import { Link } from "react-router-dom";

// GRAPHQL
import { useMutation } from "@apollo/client";
import { DELETE_PROJECT } from "../../../graphql/mutations/projectMutations";
import { GET_PROJECTS } from "../../../graphql/queries/projectQueries";
import { GET_CLIENTS } from "../../../graphql/queries/clientQueries";

import "./projectRow.css";
import AlertModal from "../../AlertModal/AlertModal";

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

  const deleteMessage =
    "Are you sure you want to delete this project? You cannot undo this action.";

  return (
    <div>
      <div className="project-row-container">
        <div className="project-title">
          <Link className="project-row-link" to={`/projects/${project.id}`}>
            <p>{project.title}</p>
          </Link>
        </div>
        <div className="project-status">
          <p>{project.status}</p>
        </div>
        <div className="project-deadline">
          <p>{project.startDate}</p>
        </div>
        <div className="project-deadline">
          <p>{project.deadline}</p>
        </div>
        <div className="project-client-name">
          <Link
            className="project-row-link"
            to={`/clients/${project.client.id}`}
          >
            {clientName}
          </Link>
        </div>
        <div className="dropdown project-dropdown">
          <button
            className="dropdown-toggle project-dropdown-btn"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          ></button>
          <ul className="dropdown-menu">
            <li>
              <AlertModal
                modalHeader="Heads up!"
                modalBody={deleteMessage}
                promptLabel="Delete"
                confirmLabel="Delete"
                action={deleteProject}
                buttonType='no-class'
              />

              {/*  <Link onClick={deleteProject} className="dropdown-item" to="/">
                Delete Project
  </Link>*/}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProjectRow;
