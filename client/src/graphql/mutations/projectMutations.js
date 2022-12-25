import { gql } from "@apollo/client";

const ADD_PROJECT = gql`
  mutation AddProject(
    $title: String!
    $description: String!
    $status: ProjectStatus!
    $clientId: ID!
  ) {
    addProject(
      title: $title
      description: $description
      status: $status 
      clientId: $clientId 
    ) {
      id
      title
      description 
      status 
      client {
        id 
        firstName
        lastName 
      }
    }
  }
`;

const DELETE_PROJECT = gql`
  mutation DeleteProject ($id: ID!) {
    deleteProject(id: $id) {
      id
    }
  }
`;

const UPDATE_PROJECT = gql`
  mutation UpdateProject(
    $id: ID!
    $title: String!
    $description: String!
    $status: ProjectStatusUpdate!
  ) {
    updateProject(
      id: $id 
      title: $title 
      description: $description 
      status: $status 
    ) {
      id 
      title 
      description 
      status 
      client {
        id 
        firstName
        lastName 
      }
    }
  }
`;

export { ADD_PROJECT, UPDATE_PROJECT, DELETE_PROJECT };