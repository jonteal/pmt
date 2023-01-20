import { useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";

// COMPONENTS
import StatusColumn from "../../components/_kanban_/StatusColumn/StatusColumn";

// GRAPHQL
import { GET_TICKETS } from "../../graphql/queries/ticketQueries";
import { GET_KANBAN } from "../../graphql/queries/kanbanQueries";

import "./kanban.css";

const Kanban = () => {
  const { id } = useParams();
  const {
    loading: kanbanLoading,
    error: kanbanError,
    data: kanbanData,
  } = useQuery(GET_KANBAN, {
    variables: { id },
  });

  const {
    loading: ticketLoading,
    error: ticketError,
    data: ticketData,
  } = useQuery(GET_TICKETS);

  const statusColumns = [
    {
      id: "Ready",
      state: "Ready",
    },
    {
      id: "In Progress",
      state: "In Progress",
    },
    {
      id: "Done",
      state: "Done",
    },
  ];

  if (kanbanLoading || ticketLoading) return <p>Loading...</p>;
  if (kanbanError || ticketError) return <p>There was an error...</p>;

  const matchingTickets = ticketData.tickets.filter(
    (ticket) => ticket.kanban.id === kanbanData.kanban.id
  );

  return (
    <div className="kanban-main-container">
      <div className="kanban-title-container">
        <h2 className="kanban-title">{kanbanData.kanban.title}</h2>
        <p className="kanban-description">{kanbanData.kanban.description}</p>
      </div>

      <div className="kanban-button-container">
        <button className="kanban-add-ticket-btn">
          <Link to="/addTicket">Add Ticket</Link>
        </button>
      </div>

      <StatusColumn
        statusColumns={statusColumns}
        matchingTickets={matchingTickets}
      />
    </div>
  );
};

export default Kanban;
