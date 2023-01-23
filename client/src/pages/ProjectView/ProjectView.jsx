import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

// GRAPHQL
import { GET_PROJECT } from "../../graphql/queries/projectQueries";
import { GET_KANBANS } from "../../graphql/queries/kanbanQueries";
import { GET_ACTIVITY_COMMENTS } from "../../graphql/queries/activityCommentQueries";

// COMPONENTS
import ActivityFeed from "../../components/_activityFeed_/ActivityFeed/ActivityFeed";
import ProjectViewItem from "../../components/_projects_/ProjectViewItem/ProjectViewItem";
import KanbanItemContainer from "../../components/_kanban_/KanbanItemContainer/KanbanItemContainer";

import { formatCurrency } from "../../utilities/formatCurrency";

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

  const {
    loading: kanbanLoading,
    error: kanbanError,
    data: kanbanData,
  } = useQuery(GET_KANBANS);

  if (projectLoading) return <p>Loading...</p>;
  if (projectError) return <p>There was an error...</p>;

  if (activityCommentsLoading) return <p>Loading...</p>;
  if (activityCommentsError) return <p>There was an error...</p>;

  if (kanbanLoading) return <p>Loading...</p>;
  if (kanbanError) return <p>There is an error return your kanbans...</p>;

  const project = projectData.project;

  const projectId = projectData.project.id;

  const activityCommentsArray = activityCommentData.activityComments;

  const matchingActivityComments = activityCommentsArray.filter(
    (activityComment) => activityComment.project.id === projectId
  );

  const kanbansArray = kanbanData.kanbans;

  const matchingKanbans = kanbansArray.filter(
    (kanban) => kanban.project.id === projectId
  );

  return (
    <div>
      {matchingKanbans && (
        <KanbanItemContainer matchingKanbans={matchingKanbans} />
      )}

      <div className={`${rootClass}-main-container`}>
        <div>
          <div className={`${rootClass}-btn-container`}>
            <Link className="project-view-link" to={`/projects/${project.id}/addKanban`}>
              <button className={`${rootClass}-add-kanban`}>Add Kanban</button>
            </Link>
            <Link to={`/projects/${project.id}/edit`}>
              <button className={`${rootClass}-edit-btn`}>Edit</button>
            </Link>
          </div>
          <div className={`${rootClass}-project-info`}>
            <ProjectViewItem header="Project Name" value={project.title} />

            <ProjectViewItem header="Description" value={project.description} />

            <ProjectViewItem header="Notes" value={project.notes} />

            <ProjectViewItem header="Status" value={project.status} />

            <ProjectViewItem header="Start Date" value={project.startDate} />

            <ProjectViewItem header="Deadline" value={project.deadline} />

            <ProjectViewItem
              header="Budget"
              value={formatCurrency(project.clientBudget)}
            />

            <ProjectViewItem
              header="Project Estimate"
              value={formatCurrency(project.projectEstimate)}
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
