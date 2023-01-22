import { Link } from "react-router-dom";
import "./kanbanItem.css";

const KanbanItem = ({ kanban }) => {

  return (
    <div className="kanban-item">
      <Link className="kanban-item-link" to={`/projects/${kanban.project.id}/kanban/${kanban.id}`}>
        <p className="kanban-item-title">{kanban.title}</p>
      </Link>
    </div>
  );
};

export default KanbanItem;
