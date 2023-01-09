import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../../graphql/queries/projectQueries";
import ProjectsContainer from "../ProjectsContainer/ProjectsContainer";
import Spinner from "../Spinner/Spinner";

import './projects.css';

const Projects = () => {
  const {
    loading: projectLoading,
    error: projectError,
    data: projectData,
  } = useQuery(GET_PROJECTS);

  const projectContainers = [
    {
      id: "Not Started",
      state: "Not Started",
    },
    {
      id: "In Progress",
      state: "In Progress",
    },
    {
      id: "Completed",
      state: "Completed",
    },
  ];

  if (projectLoading) return <Spinner />;
  if (projectError) return <p>Something went wrong...</p>;

  return (
    <div className="projects-parent-container">
      <ProjectsContainer
        projectContainers={projectContainers}
        projectData={projectData}
      />
    </div>
  );
};

export default Projects;
