
import '../../pages/ProjectView/projectView.css';

const ProjectViewItem = ({ header, value }) => {
  const rootClass = "project-view";
  return (
    <div className={`${rootClass}-item-container`}>
      <p className={`${rootClass}-header`}>{header}</p>
      <p className={`${rootClass}-notes`}>{value}</p>
    </div>
  );
};

export default ProjectViewItem;
