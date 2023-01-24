import KanbanItem from "../KanbanItem/KanbanItem";

import "./kanbanItemContainer.css";

const KanbanItemContainer = ({ matchingKanbans }) => {
  const rootClass = 'kanban-item-container';
  
  return (
    <div className={rootClass}>
      {matchingKanbans.map((kanban) => (
        <KanbanItem key={kanban.id} kanban={kanban} />
      ))}
    </div>
  );
};

export default KanbanItemContainer;
