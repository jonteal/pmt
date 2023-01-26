import KanbanItem from "../KanbanItem/KanbanItem";

import "./kanbanItemContainer.css";

const rootClass = 'kanban-item-container';

const KanbanItemContainer = ({ matchingKanbans }) => {
  
  return (
    <div className={rootClass}>
      {matchingKanbans.map((kanban) => (
        <KanbanItem key={kanban.id} kanban={kanban} />
      ))}
    </div>
  );
};

export default KanbanItemContainer;
