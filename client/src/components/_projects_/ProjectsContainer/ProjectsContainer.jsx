import { useState } from "react";
import ProjectRow from "../ProjectRow/ProjectRow";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

import "./projectsContainer.css";

const ProjectsContainer = ({ projectData, projectContainer }) => {
  const rootClass = "project-container";

  const [isExpanded, setIsExpanded] = useState(false);

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
              <div className={`${rootClass}-headers`}>
                <p className={`${rootClass}-header`}>Project</p>
                <p className={`${rootClass}-header`}>Status</p>
                <p className={`${rootClass}-header`}>Start Date</p>
                <p className={`${rootClass}-header`}>Deadline</p>
                <p className={`${rootClass}-header`}>Client</p>
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
