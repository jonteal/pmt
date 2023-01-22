import { useMutation, useQuery } from "@apollo/client";
import { Link, useNavigate, useParams } from "react-router-dom";

// COMPONENTS
import StatusColumn from "../../components/_kanban_/StatusColumn/StatusColumn";

// GRAPHQL
import { GET_TICKETS } from "../../graphql/queries/ticketQueries";
import { GET_KANBAN, GET_KANBANS } from "../../graphql/queries/kanbanQueries";

import { FaEdit, FaTrashAlt } from "react-icons/fa";

import "./kanban.css";
// import { GET_PROJECTS } from "../../graphql/queries/projectQueries";

const Kanban = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // const {
  //   loading, error, data
  // } = useQuery(GET_PROJECTS);

  const {
    loading: kanbanLoading,
    error: kanbanError,
    data: kanbanData,
  } = useQuery(GET_KANBAN, {
    variables: { id },
    fetchPolicy: 'cache-and-network',
  });

  const {
    loading: ticketLoading,
    error: ticketError,
    data: ticketData,
  } = useQuery(GET_TICKETS);

  // console.log('kanbanData.kanban.id: ', kanbanData.kanban.id)
  

  
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
            <button className="kanban-add-ticket-btn">
              <Link to="/addTicket">Add Ticket</Link>
            </button>
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
