import { Link } from "react-router-dom";

import "./kanbanItem.css";

const rootClass = "kanban-item";

const KanbanItem = ({ kanban }) => {

  return (
    <div className={rootClass}>
      <Link
        className={`${rootClass}-link`}
        to={`/projects/${kanban.project.id}/kanban/${kanban.id}`}
      >
        <p className={`${rootClass}-title`}>{kanban.title}</p>
      </Link>
    </div>
  );
};

export default KanbanItem;
