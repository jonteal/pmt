import '../../../pages/ProjectView/projectView.css';

const rootClass = "project-view";

const ProjectViewItem = ({ header, value }) => {
  return (
    <div className={`${rootClass}-item-container`}>
      <p className={`${rootClass}-header`}>{header}</p>
      <p className={`${rootClass}-notes`}>{value}</p>
    </div>
  );
};

export default ProjectViewItem;
