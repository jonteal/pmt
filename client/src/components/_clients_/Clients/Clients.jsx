import { useQuery } from "@apollo/client";

// GRAPHQL
import { GET_CLIENTS } from "../../../graphql/queries/clientQueries";

// COMPONENTS
import ClientsContainer from "../ClientsContainer/ClientsContainer";
import Spinner from "../../Spinner/Spinner";

import { FaUserAlt } from "react-icons/fa";

import "./clients.css";

const Clients = () => {
  const rootClass = 'clients';

  const {
    loading: clientLoading,
    error: clientError,
    data: clientData,
  } = useQuery(GET_CLIENTS);

  if (clientLoading) return <Spinner />;
  if (clientError) return <p>Something went wrong...</p>;

  const clientContainers = [
    {
      id: "prospect",
      state: "Prospect",
    },
    {
      id: "current",
      state: "Current",
    },
    {
      id: "former",
      state: "Former",
    },
  ];

  return (
    <div className={`${rootClass}-parent-container`}>
      <div className={`${rootClass}-header-container`}>
        <FaUserAlt className={`${rootClass}-header-icon`} />
        <h5 className={`${rootClass}-header-label`}>Clients ({clientData?.clients.length})</h5>
      </div>
      <ul>
        {clientContainers.map((clientContainer) => (
          <ClientsContainer
            key={clientContainer.id}
            clientContainer={clientContainer}
            clientData={clientData}
          />
        ))}
      </ul>
    </div>
  );
};

export default Clients;
