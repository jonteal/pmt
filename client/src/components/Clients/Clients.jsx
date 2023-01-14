import { useQuery } from "@apollo/client";
import { GET_CLIENTS } from "../../graphql/queries/clientQueries";
import ClientsContainer from "../ClientsContainer/ClientsContainer";
import Spinner from "../Spinner/Spinner";
import { FaUserAlt } from "react-icons/fa";

import "./clients.css";

const Clients = () => {
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
    <div className="projects-parent-container">
      <div className="clients-header-container">
        <FaUserAlt className="clients-header-icon" />
        <h2 className="clients-header-label">Clients</h2>
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
