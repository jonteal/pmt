import { useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import StatusColumn from "../../components/StatusColumn/StatusColumn";

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

  if (kanbanLoading) return <p>Loading...</p>;
  if (kanbanError) return <p>There was an error...</p>;
  if (ticketLoading) return <p>Loading...</p>;
  if (ticketError) return <p>There was an error...</p>;

  const ticketArray = ticketData.tickets;
  
  console.log('ticketArray: ', ticketArray);

  const kanbanId = kanbanData.kanban.id;

  const matchingTickets = ticketArray.filter((ticket) => ticket.kanban.id === kanbanId);

  return (
    <div className="kanban-main-container">
      <div className="kanban-title-container">
        <h2 className="kanban-title">{kanbanData.kanban.title}</h2>
        <p className="kanban-description">{kanbanData.kanban.description}</p>
      </div>

      <div className="kanban-button-container">
        <button className="add-ticket-btn">
          <Link to="/addTicket">Add Ticket</Link>
        </button>
        {/*<AddTicket />*/}
      </div>

      {/* IT LOOKS LIKE ALL THE TICKETDATA IS BEING PASSED IN HERE AND IS LIKELY NOT FILTERING APPROPRIATELY OR SOMETHING... */}

      <StatusColumn statusColumns={statusColumns} matchingTickets={matchingTickets} />
    </div>
  );
};

export default Kanban;
