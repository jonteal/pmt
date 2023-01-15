import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../../graphql/queries/projectQueries";


// export const ProjectsService = {
//   getAllMovies: () => fetch('http://localhost:3001/movies/all')
//       .then(function(response) {
//         return response.json();
//       })
// }

export const ProjectsService = () => {
  const {
    loading: projectLoading,
    error: projectError,
    data: projectData,
  } = useQuery(GET_PROJECTS);

  // console.log(projectData);
}

