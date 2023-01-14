import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "../../graphql/queries/projectQueries";
import { GET_ACTIVITY_COMMENTS } from "../../graphql/queries/activityCommentQueries";
import ActivityFeed from "../../components/_activityFeed_/ActivityFeed/ActivityFeed";
import ProjectViewItem from "../../components/_projects_/ProjectViewItem/ProjectViewItem";

import "./projectView.css";

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

            <ProjectViewItem 
              header="Project Name"
              value={project.title}
            />

            <ProjectViewItem 
              header="Description"
              value={project.description}
            />

            <ProjectViewItem 
              header="Notes"
              value={project.notes}
            />

            <ProjectViewItem 
              header="Status"
              value={project.status}
            />

            <ProjectViewItem 
              header="Start Date"
              value={project.startDate}
            />

            <ProjectViewItem 
              header="Deadline"
              value={project.deadline}
            />

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
