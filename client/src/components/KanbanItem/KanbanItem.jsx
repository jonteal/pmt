import React from 'react'

const KanbanItem = ({kanban}) => {
  console.log(kanban);

  return (
    <div>
      <h2>{kanban.title}</h2>
    </div>
  )
}

export default KanbanItem