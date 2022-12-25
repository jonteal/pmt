import { useQuery } from "@apollo/client";
import { GET_CLIENTS } from "../../graphql/queries/clientQueries";
import Spinner from "../Spinner/Spinner";

const Clients = () => {
  const { loading, error, data } = useQuery(GET_CLIENTS);

  if (loading) return <Spinner />
  if (error) return <p>Something went wrong...</p>;

  return (
    <div>
      <h2>Clients</h2>
      {!loading && !error && (
        <div>
          {data.clients.map((client) => (
            <div key={client.id}>
              <p>{`${client.firstName} ${client.lastName}`}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Clients;
