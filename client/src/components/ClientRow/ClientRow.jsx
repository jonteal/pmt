// ROUTING
import { Link } from "react-router-dom";

import './clientRow.css';

const ClientRow = ({ client }) => {
  console.log('client: ', client);

  const clientName = client.firstName + " " + client.lastName;

  let formatPhoneNumber = (str) => {
    let cleaned = ("" + str).replace(/\D/g, "");
    let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

    if (match) {
      return "(" + match[1] + ") " + match[2] + "-" + match[3];
    }

    return null;
  };

  return (
    <div>
    <div className="client-row-container">
      <div className="client-name">
        <Link to={`/clients/${client.id}`}>
          <h3>{clientName}</h3>
        </Link>
      </div>
      <div className="client-company">
        <p>{client.company}</p>
      </div>
      <div className="client-phone-number">
        <p>{formatPhoneNumber(client.phoneNumber)}</p> 
      </div>
      <div className="client-email-address">
        <p>{client.emailAddress}</p> 
      </div>
      <div className="dropdown client-dropdown">
        <button
          className="dropdown-toggle dropdown"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        ></button>
        {/* <ul className="dropdown-menu">
          <li>
            <Link onClick={deleteProject} className="dropdown-item" to="/">
              Delete Project
            </Link>
          </li>
  </ul> */}
      </div>
    </div>
  </div>
  )
}

export default ClientRow