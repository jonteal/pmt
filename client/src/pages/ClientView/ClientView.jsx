import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'

import { GET_CLIENT } from '../../graphql/queries/clientQueries';
import { GET_PROJECTS } from '../../graphql/queries/projectQueries';
import Spinner from '../../components/Spinner/Spinner';

import './clientView.css';
import ProjectRow from '../../components/ProjectRow/ProjectRow';
import ClientCard from '../../components/ClientCard/ClientCard';

const ClientView = () => {

  const { id } = useParams();

  const { loading: clientLoading, error: clientError, data: clientData } = useQuery(GET_CLIENT, {
    variables: { id }
  });

  const { loading: projectsLoading, error: projectsError, data: projectsData } = useQuery(GET_PROJECTS);

  if (clientLoading) return <Spinner />;
  if (clientError) return <p>There was a problem loading the client information...</p>

  if (projectsLoading) return <Spinner />;
  if (projectsError) return <p>There was a problem loading the client projects...</p>

  // Add a project add form to this component
  return (
    <div className='client-view-container'>
    
    {!clientLoading && !clientError && (
      <ClientCard clientData={clientData} />
    )}

    <h3>Projects</h3>
    {!projectsLoading && !projectsError && (
      projectsData ? (
        projectsData.projects.map((project) => (
          <ProjectRow key={project.id} project={project} />
        ))
      ) : (
        <p>No current projects for this client</p>
      )
    )}
    
    </div>
  )
}

export default ClientView