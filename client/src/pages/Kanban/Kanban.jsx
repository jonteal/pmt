import { useQuery } from "@apollo/client";
import { Link, useNavigate, useParams } from "react-router-dom";

// GRAPHQL
import { GET_TICKETS } from "../../graphql/queries/ticketQueries";
import { GET_KANBAN } from "../../graphql/queries/kanbanQueries";

// COMPONENTS
import StatusColumn from "../../components/_kanban_/StatusColumn/StatusColumn";
import Button from "../../components/Button/Button";

import { FaEdit } from "react-icons/fa";

import "./kanban.css";

const Kanban = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    loading: kanbanLoading,
    error: kanbanError,
    data: kanbanData,
  } = useQuery(GET_KANBAN, {
    variables: { id },
    fetchPolicy: "cache-and-network",
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

  if (kanbanLoading) return <p>Loading kanbans...</p>;
  if (ticketLoading) return <p>Loading tickets...</p>;
  if (kanbanError) return <p>There was an error loading kanbans...</p>;
  if (ticketError) return <p>There was an error loading tickets...</p>;

  const matchingTickets = ticketData.tickets.filter(
    (ticket) => ticket.kanban.id === kanbanData.kanban.id
  );

  return (
    <div>
      {!kanbanLoading && !kanbanError && (
        <div className="kanban-main-container">
          <div className="kanban-title-container">
            <h2 className="kanban-title">{kanbanData.kanban.title}</h2>
            <p className="kanban-description">
              {kanbanData.kanban.description}
            </p>
            <div className="kanban-icon-container">
              <Link to={`/kanbans/${kanbanData.kanban.id}/edit`}>
                <FaEdit className="kanban-edit-icon" />
              </Link>
            </div>
          </div>

          <div className="kanban-button-container">
            <Button buttonType="submit" className="kanban-add-ticket-btn">
              <Link className="kanban-add-ticket-btn-text" to="/addTicket">
                Add Ticket
              </Link>
            </Button>
          </div>

          <StatusColumn
            statusColumns={statusColumns}
            matchingTickets={matchingTickets}
          />
        </div>
      )}
    </div>
  );
};

export default Kanban;
