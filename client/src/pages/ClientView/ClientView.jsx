// LIBRARIES
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

// GRAPHQL
import { GET_CLIENT } from "../../graphql/queries/clientQueries";
import { GET_PROJECTS } from "../../graphql/queries/projectQueries";

// COMPONENTS
import Spinner from "../../components/Spinner/Spinner";
import ProjectRow from "../../components/ProjectRow/ProjectRow";
import ClientCard from "../../components/ClientCard/ClientCard";

import "./clientView.css";

const ClientView = () => {
  const { id } = useParams();
  const rootClass = "client-view";

  const {
    loading: clientLoading,
    error: clientError,
    data: clientData,
  } = useQuery(GET_CLIENT, {
    variables: { id },
  });

  const {
    loading: projectsLoading,
    error: projectsError,
    data: projectsData,
  } = useQuery(GET_PROJECTS);

  if (clientLoading) return <Spinner />;
  if (clientError)
    return <p>There was a problem loading the client information...</p>;

  if (projectsLoading) return <Spinner />;
  if (projectsError)
    return <p>There was a problem loading the client projects...</p>;

  const client = clientData.client;

  // Add a project add form to this component
  return (
    <div className={`${rootClass}-container`}>
      <div className={`${rootClass}-info-container`}>
        <div className={`${rootClass}-btn-container`}>
        <Link to={`/clients/${client.id}/edit`}>
          <button className={`${rootClass}-edit-btn`}>Edit Client</button>
          </Link>
        </div>
        {!clientLoading && !clientError && (
          <ClientCard clientData={clientData} />
        )}
      </div>

      <div className={`${rootClass}-projects-container`}>
        <h3 className={`${rootClass}-project-header`}>Projects</h3>
        {!projectsLoading &&
          !projectsError &&
          (projectsData ? (
            projectsData.projects.map((project) => (
              <ProjectRow key={project.id} project={project} />
            ))
          ) : (
            <p>No current projects for this client</p>
          ))}
      </div>
    </div>
  );
};

export default ClientView;
