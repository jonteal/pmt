import ProjectRow from "../ProjectRow/ProjectRow";

import './projectsContainer.css';

const ProjectsContainer = ({ projectData, projectContainers }) => {
  const rootClass = "project-container";

  return (
    <div>
      <div className={`${rootClass}-main-container`}>
      {projectContainers.map((container) => (
        <div key={container.id} className={`${rootClass}-status-container`}>
          <div className={`${rootClass}-state-label`}>
            <h5>{container.state}</h5>
          </div>
          <ul className={`${rootClass}-list`}>
            {projectData.projects
              .filter((project) => project.status === container.state)
              .map((project) => (
                <li key={project.id} className={`${rootClass}-list-item`}>
                  <ProjectRow project={project} />
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
    </div>
  );
};

export default ProjectsContainer;
