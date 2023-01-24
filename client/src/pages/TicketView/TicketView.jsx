import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_TICKET } from "../../graphql/queries/ticketQueries";
import Spinner from "../../components/Spinner/Spinner";
import { FaRegEdit } from "react-icons/fa";

import "./ticketView.css";
import Button from "../../components/Button/Button";

const TicketView = ({ ticket }) => {
  const { id } = useParams();
  const rootClass = "ticket-view";
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
        <div className={`${rootClass}-card`}>
          <div className="mx-auto w-100 p-5">
            <div className={`${rootClass}-controls`}>
              <Link to={`/tickets/${ticketData.ticket.id}/edit`}>
                <FaRegEdit className={`${rootClass}-edit-icon`} />
              </Link>
              <Button
                buttonType="back"
                onClick={handleBackNavigate}
                className={`btn btn-light btn-sm d-inline ms-auto ${rootClass}-back-btn`}
              >
                <span>Back</span>
              </Button>
            </div>

            <div className={`${rootClass}-content`}>
              <p className={`${rootClass}-header`}>Title</p>
              <div className={`${rootClass}-header-container`}>
                <p>{ticketData.ticket.title}</p>
              </div>
              <p className={`${rootClass}-header`}>Description</p>
              <div className={`${rootClass}-description`}>
                <p>{ticketData.ticket.description}</p>
              </div>
              <div className={`${rootClass}-createdAt-container`}>
                <p className={`${rootClass}-header`}>Created at</p>
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
