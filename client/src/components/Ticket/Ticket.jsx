import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { DELETE_TICKET } from "../../graphql/mutations/ticketMutations";
import { GET_TICKETS } from "../../graphql/queries/ticketQueries";

import "./ticket.css";

const Ticket = ({ ticket }) => {
  const [status, setStatus] = useState(ticket.status);
  const navigate = useNavigate();

  // const [deleteTicket] = useMutation(DELETE_TICKET, {
  //   variables: { id: ticket.id },
  //   onCompleted: () => navigate("/"),
  //   refetchQueries: [{ query: GET_TICKETS }],
  // });

  return (
    <div className="ticket-container">
      <div className="ticket-links">
        <div className="dropdown">


          <ul className="dropdown-menu">
            <li>
              <a className="dropdown-item" href={`/tickets/${ticket.id}`}>
                View
              </a>
            </li>
{ /*           <li>
              <button className="dropdown-item" onClick={deleteTicket}>
                Delete
              </button>
  </li> */}
          </ul>
        </div>
      </div>

      <div className="ticket-title">
        <p>{ticket.title}</p>
      </div>
      <div className="ticket-description">
        <p>{ticket.description}</p>
      </div>
      <div className="ticket-timestamp">
        <p>Created at: {ticket.createdAt}</p>
      </div>
    </div>
  );
};

export default Ticket;
