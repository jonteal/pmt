import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../../../graphql/queries/projectQueries";
import ProjectsContainer from "../ProjectsContainer/ProjectsContainer";
import Spinner from "../../Spinner/Spinner";
import { FaProjectDiagram } from "react-icons/fa";

import "./projects.css";

const rootClass = 'projects';

const Projects = () => {

  const {
    loading: projectLoading,
    error: projectError,
    data: projectData,
  } = useQuery(GET_PROJECTS);

  const projectContainers = [
    {
      id: "not-started",
      state: "Not Started",
    },
    {
      id: "in-progress",
      state: "In Progress",
    },
    {
      id: "completed",
      state: "Completed",
    },
  ];

  if (projectLoading) return <Spinner />;
  if (projectError) return <p>Something went wrong...</p>;

  return (
    <div className={`${rootClass}-parent-container`}>
      <div className={`${rootClass}-header-container`}>
        <FaProjectDiagram className={`${rootClass}-header-icon`} />
        <h5 className={`${rootClass}-header-label`}>Projects ({projectData?.projects.length})</h5>
      </div>
      <ul>
        {projectContainers.map((projectContainer) => (
          <ProjectsContainer
            key={projectContainer.id}
            projectContainer={projectContainer}
            projectData={projectData}
          />
        ))}
      </ul>
    </div>
  );
};

export default Projects;
