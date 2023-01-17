import KanbanItem from "../KanbanItem/KanbanItem";

import "./kanbanItemContainer.css";

const KanbanItemContainer = ({ kanbanData }) => {
  return (
    <div className='kanban-item-container'>
      {kanbanData.kanbans.map((kanban) => (
        <KanbanItem key={kanban.id} kanban={kanban} />
      ))}
    </div>
  );
};

export default KanbanItemContainer;
