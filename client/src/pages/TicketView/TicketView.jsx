import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_TICKET } from "../../graphql/queries/ticketQueries";
import Spinner from "../../components/Spinner/Spinner";
import { FaRegEdit } from "react-icons/fa";

import "./ticketView.css";

const TicketView = ({ ticket }) => {
  const { id } = useParams();
  const {
    loading: ticketLoading,
    error: ticketError,
    data: ticketData,
  } = useQuery(GET_TICKET, {
    variables: { id },
  });

  const navigate = useNavigate();

  const handleBackNavigate = () => {
    navigate(-1);
  };

  if (ticketLoading) return <Spinner />;
  if (ticketError) return <p>Something went wrong</p>;

  return (
    <div className="ticket-view-container">
      {!ticketLoading && !ticketError && (
        <div className="ticket-view-card">
          <div className="mx-auto w-100 p-5">
            <div className="ticket-view-controls">
              <Link to={`/tickets/${ticketData.ticket.id}/edit`}>
                <FaRegEdit className="ticket-view-edit-icon" />
              </Link>
              <button
                onClick={handleBackNavigate}
                className="btn btn-light btn-sm d-inline ms-auto ticket-view-back-btn"
              >
                <span>Back</span>
              </button>
            </div>

            <div className="ticket-view-content">
              <p className="ticket-view-header">Title</p>
              <div className="ticket-view-header-container">
                <p>{ticketData.ticket.title}</p>
              </div>
              <p className="ticket-view-header">Description</p>
              <div className="ticket-view-description">
                <p>{ticketData.ticket.description}</p>
              </div>
              <div className="ticket-view-createdAt-container">
                <p className="ticket-view-header">Created at</p>
                <p>{ticketData.ticket.createdAt}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketView;
