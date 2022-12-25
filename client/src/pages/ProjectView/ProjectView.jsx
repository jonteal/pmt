import React from 'react'
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_PROJECT } from '../../graphql/queries/projectQueries';

import './projectView.css';

const ProjectView = () => {

  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>
  if (error) return <p>There was an error...</p>

  const project = data.project;
  console.log(project);

  return (
    <div>
      <h4>{project.title}</h4>
      <p>{project.description}</p>
      <p>{project.status}</p>
    </div>
  )
}

export default ProjectView