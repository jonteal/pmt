// ROUTING
import { Link } from "react-router-dom";

import "./clientRow.css";

const ClientRow = ({ client }) => {
  const rootClass = "client-row";

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
      <div className={`${rootClass}-container`}>
        <div className={`${rootClass}-first-name`}>
          <Link className={`${rootClass}-link`} to={`/clients/${client.id}`}>
            <p className={`${rootClass}-text`}>{client.firstName}</p>
          </Link>
        </div>
        <div className={`${rootClass}-last-name`}>
          <Link className={`${rootClass}-link`} to={`/clients/${client.id}`}>
            <p className={`${rootClass}-text`}>{client.lastName}</p>
          </Link>
        </div>
        <div className={`${rootClass}-company-name`}>
          <p>{client.companyName}</p>
        </div>
        <div className={`${rootClass}-phone-number`}>
          <p>{formatPhoneNumber(client.phoneNumber)}</p>
        </div>
        <div className={`${rootClass}-email-address`}>
          <p>{client.emailAddress}</p>
        </div>
        <div className={`dropdown ${rootClass}-dropdown-container`}>
          <button
            className={`dropdown-toggle dropdown ${rootClass}-dropdown`}
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
  );
};

export default ClientRow;
