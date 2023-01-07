import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "../../graphql/queries/projectQueries";
import { GET_ACTIVITY_COMMENTS } from "../../graphql/queries/activityCommentQueries";

import "./projectView.css";
import EditProject from "../EditProject/EditProject";

const ProjectView = () => {
  const rootClass = "project-view";
  const { id } = useParams();

  const { loading: projectLoading, error: projectError, data: projectData } = useQuery(GET_PROJECT, {
    variables: { id },
  });

  const { loading: activityCommentsLoading, error: activityCommentsError, data: activityCommentData } = useQuery(GET_ACTIVITY_COMMENTS);

  if (projectLoading) return <p>Loading...</p>;
  if (projectError) return <p>There was an error...</p>;

  if (activityCommentsLoading) return <p>Loading...</p>;
  if (activityCommentsError) return <p>There was an error...</p>;

  console.log('comments: ', activityCommentData);

  const project = projectData.project;

  const projectId = projectData.project.id;
  const activityCommentArray = activityCommentData.activityComments;

  const matchingActivityComments = activityCommentArray.filter(
    (activityComment) => activityComment.project.id === projectId
  );

  console.log('matchingComments: ', matchingActivityComments);

  console.log(project.id);

  return (
    <div className={`${rootClass}-main-container`}>
      <div className={`${rootClass}-btn-container`}>
        <Link to={`/projects/${project.id}/edit`}>
          <button className={`${rootClass}-edit-btn`}>Edit</button>
        </Link>
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
