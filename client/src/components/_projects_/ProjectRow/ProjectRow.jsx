// ROUTING
import { Link } from "react-router-dom";

// GRAPHQL
import { useMutation } from "@apollo/client";
import { DELETE_PROJECT } from "../../../graphql/mutations/projectMutations";
import { GET_PROJECTS } from "../../../graphql/queries/projectQueries";
import { GET_CLIENTS } from "../../../graphql/queries/clientQueries";

// COMPONENTS
import ProjectRowItem from "../ProjectRowItem/ProjectRowItem";

import "./projectRow.css";

const rootClass = "project";

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
    <div className={`${rootClass}-row-container`}>
      <div className={`${rootClass}-title`}>
        <Link
          className={`${rootClass}-row-link`}
          to={`/projects/${project.id}`}
        >
          <p>{project.title}</p>
        </Link>
      </div>

      <ProjectRowItem item={project.status} />

      <ProjectRowItem item={project.startDate} />

      <ProjectRowItem item={project.deadline} />

      <div className={`${rootClass}-client-name`}>
        <Link
          className={`${rootClass}-row-link`}
          to={`/clients/${project.client.id}`}
        >
          {clientName}
        </Link>
      </div>
      <div className={`dropdown ${rootClass}-dropdown`}>
        <button
          className={`dropdown-toggle ${rootClass}-dropdown-btn`}
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        ></button>
        <ul className="dropdown-menu">
          <li className={`${rootClass}-dropdown-list-item`}>
            <Link to={`/projects/${project.id}/edit`} className="dropdown-item">
              Edit Project
            </Link>
          </li>
          <li className={`${rootClass}-dropdown-list-item`}>
            <Link onClick={deleteProject} to="/" className="dropdown-item">
              Delete Project
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProjectRow;
