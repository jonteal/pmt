import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "../../graphql/queries/projectQueries";
import { GET_ACTIVITY_COMMENTS } from "../../graphql/queries/activityCommentQueries";

import "./projectView.css";
import ActivityFeed from "../../components/ActivityFeed/ActivityFeed";

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

  console.log('projects: ', project);

  const projectId = projectData.project.id;

  const activityCommentsArray = activityCommentData.activityComments;

  const matchingActivityComments = activityCommentsArray.filter(
    (activityComment) => activityComment.project.id === projectId
  );

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

            <div className={`${rootClass}-item-container`}>
              <p className={`${rootClass}-header`}>Project Name</p>
              <h4 className={`${rootClass}-title`}>{project.title}</h4>
            </div>

            <div className={`${rootClass}-item-container`}>
              <p className={`${rootClass}-header`}>Description</p>
              <p className={`${rootClass}-description`}>
                {project.description}
              </p>
            </div>

            <div className={`${rootClass}-item-container`}>
              <p className={`${rootClass}-header`}>Notes</p>
              <p className={`${rootClass}-notes`}>
                {project.notes}
              </p>
            </div>

            <div className={`${rootClass}-item-container`}>
              <p className={`${rootClass}-header`}>Status</p>
              <p className={`${rootClass}-status`}>{project.status}</p>
            </div>

            <div className={`${rootClass}-item-container`}>
              <p className={`${rootClass}-header`}>Start Date</p>
              <p className={`${rootClass}-startDate`}>{project.startDate}</p>
            </div>

            <div className={`${rootClass}-item-container`}>
              <p className={`${rootClass}-header`}>Deadline</p>
              <p className={`${rootClass}-deadline`}>{project.deadline}</p>
            </div>

          </div>
        </div>
      </div>

      <ActivityFeed
        matchingActivityComments={matchingActivityComments}
        projectId={projectId}
      />
    </div>
  );
};

export default ProjectView;
