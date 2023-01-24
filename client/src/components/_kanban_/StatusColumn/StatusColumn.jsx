// COMPONENTS
import Ticket from "../Ticket/Ticket";

import "./statusColumn.css";

const StatusColumn = ({ statusColumns, matchingTickets }) => {
  const rootClass = 'status-column';
  
  return (
    <div className={`${rootClass}-container`}>
      {statusColumns.map((column) => (
        <div key={column.id} className={rootClass}>
          <div className={`${rootClass}-state-label`}>
            <h5>{column.state}</h5>
          </div>
          <ul className={`${rootClass}-ticket-list`}>
            {matchingTickets
              .filter((ticket) => ticket.status === column.state)
              .map((ticket) => (
                <li key={ticket.id} className={`${rootClass}-list-item`}>
                  <Ticket ticket={ticket} />
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default StatusColumn;
