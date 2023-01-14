import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import ClientRow from '../ClientRow/ClientRow';

import './clientsContainer.css';

const ClientsContainer = ({ clientData, clientContainer }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const rootClass = "client-container";

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
          <div className={`${rootClass}-state-label`}>
            <h5>{clientContainer.state}</h5>
          </div>
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
            <div className="client-container-headers">
              <p className="client-container-header">First Name</p>
              <p className="client-container-header">Last Name</p>
              <p className="client-container-header">Company</p>
              <p className="client-container-header">Email Address</p>
              <p className="client-container-header">Phone Number</p>
            </div>
            <ul className={`${rootClass}-list`}>
              {clientData.clients
                .filter(
                  (client) => client.status === clientContainer.state
                )
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
  )
}

export default ClientsContainer;