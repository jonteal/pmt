import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "../../graphql/queries/projectQueries";
import { Link } from "react-router-dom";

import "./projectView.css";
import EditProject from "../EditProject/EditProject";

const ProjectView = () => {
  const rootClass = "project-view";
  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>There was an error...</p>;

  const project = data.project;

  return (
    <div className={`${rootClass}-main-container`}>
      <div className={`${rootClass}-btn-container`}>
          <button>Edit</button>
      </div>
      <div className={`${rootClass}-project-info`}>
        <h4 className={`${rootClass}-title`}>{project.title}</h4>
        <p className={`${rootClass}-description`}>{project.description}</p>
        <p className={`${rootClass}-status`}>{project.status}</p>
      </div>
    </div>
  );
};

export default ProjectView;
