import "./projectRowItem.css";

const rootClass = "project-row-item";

const ProjectRowItem = ({ item }) => {
  return (
    <div className={`${rootClass}-container`}>
      <p>{item}</p>
    </div>
  );
};

export default ProjectRowItem;
