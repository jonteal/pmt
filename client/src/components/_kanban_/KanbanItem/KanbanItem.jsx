import { Link } from "react-router-dom";
import "./kanbanItem.css";

const KanbanItem = ({ kanban }) => {

  return (
    <div className="kanban-item">
      <Link to={`/projects/${kanban.project.id}/kanban/${kanban.id}`}>
        <h2>{kanban.title}</h2>
      </Link>
    </div>
  );
};

export default KanbanItem;
