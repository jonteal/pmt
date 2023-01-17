import Ticket from "../Ticket/Ticket";
import "./statusColumn.css";

const StatusColumn = ({ statusColumns, ticketData }) => {
  return (
    <div className="status-column-container">
      {statusColumns.map((column) => (
        <div key={column.id} className="status-column">
          <div className="column-state-label">
            <h5>{column.state}</h5>
          </div>
          <ul className="ticket-list">
            {ticketData.tickets
              .filter((ticket) => ticket.status === column.state)
              .map((ticket) => (
                <li key={ticket.id} className="column-list-item">
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
