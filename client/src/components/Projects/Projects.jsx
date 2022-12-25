import { useQuery } from "@apollo/client"
import { GET_PROJECTS } from '../../graphql/queries/projectQueries';
import ProjectRow from "../ProjectRow/ProjectRow";
import Spinner from "../Spinner/Spinner";


const Projects = () => {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) return <Spinner />
  if (error) return <p>Something went wrong...</p>

  return (
    <div>
      { data.projects.length > 0 ? (
        <div>
          {data.projects.map((project) => (
            <ProjectRow key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <p>No projects to display right now</p>
      )}
    </div>
  )
}

export default Projects