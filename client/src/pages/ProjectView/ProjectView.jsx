import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "../../graphql/queries/projectQueries";
import { GET_ACTIVITY_COMMENTS } from "../../graphql/queries/activityCommentQueries";

import "./projectView.css";
import EditProject from "../EditProject/EditProject";
import ActivityFeed from "../../components/ActivityFeed/ActivityFeed";
import ActivityComment from "../../components/ActivityComment/ActivityComment";

const ProjectView = () => {
  const rootClass = "project-view";
  const { id } = useParams();

  const {
    loading: projectLoading,
    error: projectError,
    data: projectData,
  } = useQuery(GET_PROJECT, {
    variables: { id },
  });

  const {
    loading: activityCommentsLoading,
    error: activityCommentsError,
    data: activityCommentData,
  } = useQuery(GET_ACTIVITY_COMMENTS);

  if (projectLoading) return <p>Loading...</p>;
  if (projectError) return <p>There was an error...</p>;

  if (activityCommentsLoading) return <p>Loading...</p>;
  if (activityCommentsError) return <p>There was an error...</p>;

  const project = projectData.project;

  const projectId = projectData.project.id;
  console.log('projectId: ', projectId);

  const activityCommentsArray = activityCommentData.activityComments;
  console.log("activityCommentsArray: ", activityCommentsArray);

  const matchingActivityComments = activityCommentsArray.filter(
    (activityComment) => activityComment.project.id === projectId
  );

  console.log("matchingComments: ", matchingActivityComments);

  return (
    <div>
      <div className={`${rootClass}-main-container`}>
        <div>
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
      </div>

      <div className={`${rootClass}-main-container`}>
        <ul>
          {matchingActivityComments.map((comment) => (
            <li key={comment.id}>
              <ActivityComment key={comment.id} comment={comment}/>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProjectView;
