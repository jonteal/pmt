import { gql } from "@apollo/client";

const GET_PROJECTS = gql`
  query getProjects {
    projects {
      id
      title
      description
      status 
      client {
        id
        firstName
        lastName
      }
      createdAt
      startDate
      deadline
    }
  }
`;

const GET_PROJECT = gql`
  query getProject($id: ID) {
    project(id: $id) {
      id
      title
      description
      status 
      client {
        id 
        firstName
        lastName 
      }
      createdAt
      startDate
      deadline
    }
  }
`;

export { GET_PROJECTS, GET_PROJECT };