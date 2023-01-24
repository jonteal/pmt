import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

// GRAPHQL
import { DELETE_TICKET } from "../../../graphql/mutations/ticketMutations";
import { GET_TICKETS } from "../../../graphql/queries/ticketQueries";
import { FaEye } from "react-icons/fa";

import "./ticket.css";

const Ticket = ({ ticket }) => {
  const rootClass = "ticket";

  return (
    <div className={`${rootClass}-container`}>
      <div className={`${rootClass}-links`}>
        <Link to={`/tickets/${ticket.id}`} className="ticket-link">
          <FaEye className={`${rootClass}-icon`} />
        </Link>
      </div>

      <div className={`${rootClass}-title`}>
        <p>{ticket.title}</p>
      </div>
      <div className={`${rootClass}-description`}>
        <p>{ticket.description.substring(0, 80)}...</p>
      </div>
      <div className={`${rootClass}-timestamp`}>
        <p>Created at: {ticket.createdAt}</p>
      </div>
    </div>
  );
};

export default Ticket;
