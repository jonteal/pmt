import { useState } from "react";
import ProjectRow from "../ProjectRow/ProjectRow";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

import "./projectsContainer.css";

const ProjectsContainer = ({ projectData, projectContainer }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const rootClass = "project-container";

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <div className={`${rootClass}-main-container`}>
        <div
          key={projectContainer.id}
          className={`${rootClass}-status-container`}
        >
          <div className={`${rootClass}-header-section`}>
            <h5 className={`${rootClass}-state-label`}>
              {projectContainer.state}
            </h5>
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
            <div>
              <div className="project-container-headers">
                <p className="project-container-header">Project</p>
                <p className="project-container-header">Status</p>
                <p className="project-container-header">Start Date</p>
                <p className="project-container-header">Deadline</p>
                <p className="project-container-header">Client</p>
              </div>
              <ul className={`${rootClass}-list`}>
                {projectData.projects
                  .filter(
                    (project) => project.status === projectContainer.state
                  )
                  .map((project) => (
                    <li key={project.id} className={`${rootClass}-list-item`}>
                      <ProjectRow project={project} />
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectsContainer;
