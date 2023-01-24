import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import ClientRow from "../ClientRow/ClientRow";

import "./clientsContainer.css";

const ClientsContainer = ({ clientData, clientContainer }) => {
  const rootClass = "client-container";

  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <div className={`${rootClass}-main-container`}>
        <div
          key={clientContainer.id}
          className={`${rootClass}-status-container`}
        >
          <div className={`${rootClass}-header-section`}>
            <h5 className={`${rootClass}-state-label`}>
              {clientContainer.state}
            </h5>
            {isExpanded ? (
              <FaChevronUp
                onClick={handleClick}
                className={`${rootClass}-carrot`}
              />
            ) : (
              <FaChevronDown
                onClick={handleClick}
                className={`${rootClass}-carrot`}
              />
            )}
          </div>

          {isExpanded && (
            <>
              <div className={`${rootClass}-headers`}>
                <p className={`${rootClass}-header`}>First Name</p>
                <p className={`${rootClass}-header`}>Last Name</p>
                <p className={`${rootClass}-header`}>Company</p>
                <p className={`${rootClass}-header`}>Email Address</p>
                <p className={`${rootClass}-header`}>Phone Number</p>
              </div>
              <ul className={`${rootClass}-list`}>
                {clientData.clients
                  .filter((client) => client.status === clientContainer.state)
                  .map((client) => (
                    <li key={client.id} className={`${rootClass}-list-item`}>
                      <ClientRow client={client} />
                    </li>
                  ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientsContainer;
