import { gql } from "@apollo/client";

const ADD_PROJECT = gql`
  mutation AddProject(
    $title: String!
    $description: String!
    $status: ProjectStatus!
    $clientId: ID!
    $deadline: String
  ) {
    addProject(
      title: $title
      description: $description
      status: $status 
      clientId: $clientId 
      deadline: $deadline
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
      deadline
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
    $title: String
    $description: String
    $status: ProjectStatusUpdate
    $deadline: String
  ) {
    updateProject(
      id: $id 
      title: $title 
      description: $description 
      status: $status 
      deadline: $deadline
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
      deadline
    }
  }
`;

export { ADD_PROJECT, UPDATE_PROJECT, DELETE_PROJECT };