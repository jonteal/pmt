import { useQuery } from "@apollo/client";
import { GET_CLIENTS } from "../../graphql/queries/clientQueries";
import ClientsContainer from "../ClientsContainer/ClientsContainer";
import Spinner from "../Spinner/Spinner";

import './clients.css';

const Clients = () => {
  const { loading: clientLoading, error: clientError, data: clientData } = useQuery(GET_CLIENTS);

  if (clientLoading) return <Spinner />
  if (clientError) return <p>Something went wrong...</p>;

  const clientContainers = [
    {
      id: "prospect",
      state: "Prospect",
    },
    {
      id: "current",
      state: "Current Customer",
    },
    {
      id: "former",
      state: "Former Customer",
    },
  ];

  return (
    <div className="projects-parent-container">
    <h2 className="projects-header">Clients</h2>
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
