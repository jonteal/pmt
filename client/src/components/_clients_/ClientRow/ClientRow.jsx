// ROUTING
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

// GRAPHQL
import { DELETE_CLIENT } from '../../../graphql/mutations/clientMutations';
import { GET_CLIENTS } from "../../../graphql/queries/clientQueries";
import { GET_PROJECTS } from "../../../graphql/queries/projectQueries";

// COMPONENTS
import ClientRowItem from "../ClientRowItem/ClientRowItem";

import "./clientRow.css";

const rootClass = "client-row";

const ClientRow = ({ client }) => {

  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    refetchQueries: [
      { query: GET_CLIENTS },
      {
        query: GET_PROJECTS,
      },
    ],
  });

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

        <ClientRowItem item={client.companyName} />

        <ClientRowItem item={formatPhoneNumber(client.phoneNumber)} />

        <ClientRowItem item={client.emailAddress} />

        <div className={`dropdown ${rootClass}-dropdown-container`}>
          <button
            className={`dropdown-toggle dropdown ${rootClass}-dropdown`}
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          ></button>
          <ul className="dropdown-menu">
            <li>
              <Link onClick={deleteClient} className="dropdown-item" to="/">
                Delete Client
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ClientRow;
