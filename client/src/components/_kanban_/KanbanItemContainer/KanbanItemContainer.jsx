import KanbanItem from "../KanbanItem/KanbanItem";

import "./kanbanItemContainer.css";

const KanbanItemContainer = ({ matchingKanbans }) => {
  console.log('matchingKanbans for container: ', matchingKanbans)
  return (
    <div className='kanban-item-container'>
      {matchingKanbans.map((kanban) => (
        <KanbanItem key={kanban.id} kanban={kanban} />
      ))}
    </div>
  );
};

export default KanbanItemContainer;
