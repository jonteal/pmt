import ProjectRow from "../ProjectRow/ProjectRow";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

import "./projectsContainer.css";
import { useState } from "react";

const ProjectsContainer = ({ projectData, projectContainer }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const rootClass = "project-container";

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  console.log('projectData: ', projectData);
  console.log('projectContainers: ', projectContainer);

  return (
    <div>
      <div className={`${rootClass}-main-container`}>
          <div key={projectContainer.id} className={`${rootClass}-status-container`}>
            <div className={`${rootClass}-header-section`}>
              <div className={`${rootClass}-state-label`}>
                <h5>{projectContainer.state}</h5>
              </div>
              {isExpanded ? (
                <FaChevronUp
                  onClick={handleClick}
                  className={`${rootClass}-carrot`}
                />
              ) : (
                <FaChevronDown
                  onClick={handleClick}
                  className={`${rootClass}-carrot`}
                />
              )}
            </div>

            {isExpanded && (
              <ul className={`${rootClass}-list`}>
                {projectData.projects
                  .filter((project) => project.status === projectContainer.state)
                  .map((project) => (
                    <li key={project.id} className={`${rootClass}-list-item`}>
                      <ProjectRow project={project} />
                    </li>
                  ))}
              </ul>
            )}
          </div>
        
      </div>
    </div>
  );
};

export default ProjectsContainer;
