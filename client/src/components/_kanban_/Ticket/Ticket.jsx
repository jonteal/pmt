// import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { DELETE_TICKET } from "../../../graphql/mutations/ticketMutations";
import { GET_TICKETS } from "../../../graphql/queries/ticketQueries";
import { FaEye, FaTrashAlt } from "react-icons/fa";

import "./ticket.css";

const Ticket = ({ ticket }) => {
  // const [status, setStatus] = useState(ticket.status);
  const navigate = useNavigate();

  const [deleteTicket] = useMutation(DELETE_TICKET, {
    variables: { id: ticket.id },
    onCompleted: () => navigate("/"),
    refetchQueries: [{ query: GET_TICKETS }],
  });

  return (
    <div className="ticket-container">
      <div className="ticket-links">
        <Link to={`/tickets/${ticket.id}`} className='ticket-link'>
          <FaEye className="ticket-icon" />
        </Link>
{ /*       <Link to={`/tickets/${ticket.id}`} className='ticket-link'>
          <FaTrashAlt className="ticket-icon" onClick={deleteTicket} />
  </Link>*/}
      </div>

      <div className="ticket-title">
        <p>{ticket.title}</p>
      </div>
      <div className="ticket-description">
        <p>{ticket.description.substring(0, 80)}...</p>
      </div>
      <div className="ticket-timestamp">
        <p>Created at: {ticket.createdAt}</p>
      </div>
    </div>
  );
};

export default Ticket;
